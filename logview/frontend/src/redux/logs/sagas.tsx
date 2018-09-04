import { put, call, take, race, all, takeLatest, cancelled } from 'redux-saga/effects';
import { connect, createSocketChannel, disconnect } from 'src/services/websockets/logs';
import * as constants from 'src/redux/logs/constants';
import { GetNewHttpStats, getNewHttpStats } from './actions';
import { logsAPI } from '../../services';
let socket;

/*function* fetchNewLog() {
	try {
		const companyToken = 'secret-company-token';
		socket = yield call(connect);

		socket.emit('getLogs', companyToken);

		const callback = yield call(logsAPI.resoucesAverages, { 'X-COMPANY-TOKEN': companyToken });
		console.log(callback);

		const socketChannel = yield call(createSocketChannel, socket);
		while (true) {
			const newLog = yield take(socketChannel);
			delete newLog.app; //temporary
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
	} finally {
		if (yield cancelled()) {
			yield call(disconnect);
		}
	}
}
*/
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

export default function* logSaga() {
	yield all([takeLatest(constants.GET_NEW_HTTP_STATS, fetchHttpStats)]);

	/*while (true) {
		yield race({
			task: call(fetchNewLog),
			cancel: call(disconnect)
		});
	}*/
}