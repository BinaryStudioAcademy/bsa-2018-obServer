import { put, call, take, race } from 'redux-saga/effects';
import { connect, createSocketChannel } from 'src/services/websockets/logs';
import * as constants from 'src/redux/logs/constants';
import { logsAPI } from '../../services';

function* fetchNewLog() {
	try {
		const companyToken = 'secret-company-token';
		const socket = yield call(connect);

		socket.emit('getLogs', companyToken);
		socket.emit('test', 'lolz');

		const callback = yield call(logsAPI.resoucesAverages, { 'X-COMPANY-TOKEN': companyToken });
		console.log(callback);

		socket.on('newLog', (data) => {
			console.log('FROM CALLBACK');
			console.log(data);	
		});

		const socketChannel = yield call(createSocketChannel, socket);
		while (true) {
			const newLog = yield take(socketChannel);
			delete newLog.app;
			const newLogArr = [newLog];
			console.log(newLogArr);

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
