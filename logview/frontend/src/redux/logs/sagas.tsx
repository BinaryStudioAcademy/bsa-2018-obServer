import { put, call, take, race, all, takeLatest } from 'redux-saga/effects';
import { connect, createSocketChannel } from 'src/services/websockets/logs';
import * as constants from 'src/redux/logs/constants';
import { GetNewHttpStats, getNewHttpStats, GetLogMessages } from './actions';
import { logsAPI } from '../../services';

function* fetchNewLog() {
	try {
		const companyToken = 'secret-company-token';
		const socket = yield call(connect);

		socket.emit('getLogs', companyToken);
		socket.emit('test', 'lolz');

		const callback = yield call(logsAPI.resoucesAverages, {
			'X-COMPANY-TOKEN': companyToken
		});
		console.log(callback);

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

function* fetchHttpStats(action: GetNewHttpStats) {
	try {
		const currentHttpStats = yield call(
			logsAPI.getHttpStats,
			'companyId',
			'appId'
		);
		console.log('saga fetchHttpStats', currentHttpStats);
		yield put({
			type: constants.GET_NEW_HTTP_STATS_SUCCESS,
			payload: {
				...currentHttpStats
			}
		});
	} catch (error) {
		yield put({
			type: constants.GET_NEW_HTTP_STATS_FAILED
		});
	}
}

function* fetchLogMessages(action: GetLogMessages) {
	try {
		const res = yield call(logsAPI.getLogMessages, {
			'X-COMPANY-TOKEN': action.companyId
		});
		yield put({
			type: constants.GET_LOG_MESSAGES_SUCCESS,
			payload: {
				logMessages: res.data.logMessage
			}
		});
	} catch (error) {
		yield put({
			type: constants.GET_LOG_MESSAGES_FAILED
		});
	}
}

export default function* logSaga() {
	yield all([
		takeLatest(constants.GET_NEW_HTTP_STATS, fetchHttpStats),
		takeLatest(constants.GET_LOG_MESSAGES, fetchLogMessages)
	]);

	// while (true) {
	// 	yield race({
	// 		task: call(fetchNewLog)
	// 	});
	// }
}
