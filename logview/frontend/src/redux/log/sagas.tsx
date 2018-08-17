import { takeLatest, put, call, all, take } from 'redux-saga/effects';
//import { LogState } from '../../types/LogState';
import * as constants from './constants';
import { FetchLog } from './actions';
import { fetchLogs as fetchAllLogs } from 'src/services/websockets/logs';

function* fetchLog(action: FetchLog) {
	try {
		const newLog = yield call(fetchAllLogs);

		yield put({
			type: constants.ADD_NEW_LOG,
			log: newLog
		});

		yield put({
			type: constants.FETCH_LOG_SUCCESS,
			log: newLog
		});
	} catch (err) {
		yield put({
			type: constants.FETCH_LOG_FAILED
		});
	}
}

export default function* logSaga() {
	yield all([takeLatest(constants.FETCH_LOG, fetchLog)]);
}
