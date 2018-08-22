import { takeLatest, put, call, all } from 'redux-saga/effects';
import { companyAPI } from '../../services';
import { FetchCompanyUsers } from './actions';
import * as constants from './constants';

function* fetchCompanyUsers(action: FetchCompanyUsers) {
	try {
		const company = yield call(companyAPI.registerUser);

		yield put({
			type: constants.FETCH_COMPANY_USERS_SUCCESS,
			payload: {
				...company
			}
		});
	} catch (error) {
		yield put({
			type: constants.FETCH_COMPANY_USERS_FAILED
		});
	}
}

export default function* companySaga() {
	yield all([takeLatest(constants.FETCH_COMPANY_USERS, fetchCompanyUsers)]);
}
