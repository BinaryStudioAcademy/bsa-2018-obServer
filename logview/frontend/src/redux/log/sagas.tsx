import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { takeLatest, put, call, all, take } from 'redux-saga/effects';
import * as constants from './constants';
import { FetchLog } from './actions';
import { fetchLogs } from 'src/services/websockets/logs';

let socket;

const connect = () => {
	socket = io('http://localhost:3060');
	return new Promise(resolve => {
		socket.on('connect', () => {
			resolve(socket);
		});
	});
};

const createSocketChannel = socket =>
	eventChannel(emit => {
		const handler = data => {
			console.log(data);
			emit(data);
		};
		socket.on('newLog', handler);
		return () => {
			socket.off('newLog', handler);
		};
	});

function* fetchLog(action: FetchLog) {
	try {
		const companyId = 'LOG_COLLECT_SECRET_TOKEN';
		fetchLogs(companyId); //now need to define socket room, then will work to store all receiving logs
		const socket = yield call(connect);

		const socketChannel = yield call(createSocketChannel, socket);

		while (true) {
			const payload = yield take(socketChannel);
			console.log(payload);
		}

		// yield put({
		// 	type: constants.ADD_NEW_LOG,
		// 	log: newLog
		// });

		// yield put({
		// 	type: constants.FETCH_LOG_SUCCESS,
		// 	log: newLog
		// });
	} catch (err) {
		yield put({
			type: constants.FETCH_LOG_FAILED
		});
	}
}

export default function* logSaga() {
	yield all([takeLatest(constants.FETCH_LOG, fetchLog)]);
}
