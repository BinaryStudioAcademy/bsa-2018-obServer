import { takeLatest, put, call, all, take } from 'redux-saga/effects';
import api from 'src/services/adapter';
import { logAPI } from '../../services';
import { LogState } from '../../types/LogState';
import * as constants from './constants';
import { FetchLogs } from './actions';

function* fetchLogs(action: FetchLogs) {
	try {
		const logs = yield call(logAPI.fetchLogs);

		yield put({
			type: constants.FETCH_LOGS_SUCCESS,
			payload: {
				...logs
			}
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
