import { put, call, all, takeLatest } from 'redux-saga/effects';
import * as constants from 'src/redux/logs/constants';
import { GetNewHttpStats, getNewHttpStats } from './actions';
import { logsAPI } from '../../services';

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
}
