import { put, call, take, race } from 'redux-saga/effects';
import { connect, createSocketChannel } from 'src/services/websockets/logs';
import * as constants from 'src/redux/logs/constants';
import { logsAPI } from '../../services';

function* fetchNewLog() {
	try {
		const companyId = 'secret-company-token';
		const socket = yield call(connect);

		socket.emit('getLogs', companyId, logs => {
			console.log(logs);
		});

		// const callback = yield call(logsAPI.resoucesAverages, companyId);
		// console.log(callback);

		const socketChannel = yield call(createSocketChannel, socket);
		while (true) {
			const newLog = yield take(socketChannel);
			delete newLog.app;
			const newLogArr = [newLog];

			switch (newLog.logType) {
				case 'MEMORY_SERVER':
					yield put({
						type: constants.GET_NEW_MEMORY_LOG_SUCCESS,
						payload: {
							memoryLogs: newLogArr
						}
					});
					break;
				case 'CPU_SERVER':
					yield put({
						type: constants.GET_NEW_CPU_LOG_SUCCESS,
						payload: {
							cpuLogs: newLogArr
						}
					});
					break;
				default:
					break;
			}
		}
	} catch (err) {
		console.error(err);
	}
}

export default function* logSaga() {
	while (true) {
		yield race({
			task: call(fetchNewLog)
		});
	}
}
