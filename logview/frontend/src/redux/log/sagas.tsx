import { takeLatest, put, call, all, take } from 'redux-saga/effects';
//import { LogState } from '../../types/LogState';
import * as constants from './constants';
import { FetchLog } from './actions';
import { getNewLog, getLogs } from 'src/services/websockets/logs';

function* fetchLog(action: FetchLog) {
	try {
		console.log('SAGA');
		const companyId = 'LOG_COLLECT_SECRET_TOKEN';
		getLogs(companyId);
		getNewLog(log => {
			console.log(log);
		});
		console.log('WAS SOCKET CALL');
		//const newLog = yield call(getNewLog);

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
