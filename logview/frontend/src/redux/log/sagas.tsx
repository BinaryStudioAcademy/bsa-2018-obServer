import { takeLatest, put, call, all, take } from 'redux-saga/effects';
import api from 'src/services/adapter';
import { logAPI } from '../../services';
import { LogState } from '../../types/LogState';
import * as constants from './constants';
import { FetchLogs } from './actions';
import { fetchLogs as fetchAllLogs } from 'src/services/websockets/logs';

function* fetchLogs(action: FetchLogs) {
	try {
		const logs = yield call(fetchAllLogs);

		console.log(logs);

		yield put({
			type: constants.FETCH_LOGS_SUCCESS,
			logs
		});
	} catch (err) {
		yield put({
			type: constants.FETCH_LOGS_FAILED
		});
	}
}

export default function* logSaga() {
	yield all([takeLatest(constants.FETCH_LOGS, fetchLogs)]);
}
