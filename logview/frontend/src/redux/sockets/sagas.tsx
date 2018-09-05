import { put, call, take, race, all, takeLatest, cancelled, fork } from 'redux-saga/effects';
import * as constants from 'src/redux/sockets/constants';
import * as logsConstants from 'src/redux/logs/constants';
import {  } from './actions';
import { logsAPI } from '../../services';
import { delay } from 'redux-saga';
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { apply } from 'redux-saga/effects';

const port = 3060;
const url = `http://localhost:${port}`;

let socket;

export const connect = () => {
	socket = io(url);
	return new Promise(resolve => {
		socket.on('connect', () => {
			resolve(socket);
		});
	});
};

export const disconnect = () => {
	socket = io(url);
	return new Promise((resolve) => {
        socket.on('disconnect', () => {
            resolve(socket);
        });
	});
};

export const reconnect = () => {
	socket = io(url);
	return new Promise((resolve) => {
        socket.on('reconnect', () => {
            resolve(socket);
        });
	});
};

export const createSocketChannel = socket =>
	eventChannel(emit => {
		const handler = data => {
			emit(data);
		};
		socket.on('newLog', handler);
		return () => { 
			socket.off('newLog', handler);
		}
	});

export function* fetchAllLogs(companyId) {
	yield apply(socket, socket.emit('getLogs'), companyId);
}

const listenDisconnectSaga = function* () {
    while (true) {
        yield call(disconnect);
        yield put({type: constants.SERVER_OFF});
    }
};
  
const listenConnectSaga = function* () {
    while (true) {
        yield call(reconnect);
        yield put({type: constants.SERVER_ON});
    }
};

const listenServerSaga = function* () {
    try {
        yield put({type: constants.CHANNEL_ON});
        const {timeout} = yield race({
            connected: call(connect),
            timeout: delay(1000),
        });
        if (timeout) {
            yield put({type: constants.SERVER_OFF});
        }
        const socket = yield call(connect);
        const socketChannel = yield call(createSocketChannel, socket);
        yield fork(listenDisconnectSaga);
        yield fork(listenConnectSaga);
        yield put({type: constants.SERVER_ON});
  
        const companyToken = 'secret-company-token';
		socket.emit('getLogs', companyToken);
        const callback = yield call(logsAPI.resoucesAverages, { 'X-COMPANY-TOKEN': companyToken });
        
        while (true) {
			const newLog = yield take(socketChannel);
			const newLogArr = [newLog];

			switch (newLog.logType) {
				case 'MEMORY_SERVER':
					yield put({
						type: logsConstants.GET_NEW_MEMORY_LOG_SUCCESS,
						payload: {
							memoryLogs: newLogArr
						}
					});
					break;
				case 'CPU_SERVER':
					yield put({
						type: logsConstants.GET_NEW_CPU_LOG_SUCCESS,
						payload: {
							cpuLogs: newLogArr
						}
					});
					break;
				default:
					break;
			}
		}

    } catch (error) {
        console.log(error);
    } finally {
        if (yield cancelled()) {
            socket.disconnect(true);
            yield put({type: constants.CHANNEL_OFF});
        }
    }
  };
  
export default function* () {
    while (true) {
        yield take(constants.START_CHANNEL);
        yield race({
            task: call(listenServerSaga),
            cancel: take(constants.STOP_CHANNEL),
        });
    }
  };