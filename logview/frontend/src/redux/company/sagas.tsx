import { takeLatest, put, call, all } from 'redux-saga/effects';
import { companyAPI } from '../../services';
import { FetchCompanyUsers, UserChangeCompany } from './actions';
import * as constants from './constants';

function* fetchCompanyUsers(action: FetchCompanyUsers) {
	try {
		const company = yield call(companyAPI.getCompanyUsers);
		const users = company.data;

		yield put({
			type: constants.FETCH_COMPANY_USERS_SUCCESS,
			payload: {
				users
			}
		});
	} catch (error) {
		yield put({
			type: constants.FETCH_COMPANY_USERS_FAILED
		});
	}
}

function* userChagngeCompany(action: UserChangeCompany) {
	try {
		const companyUser = yield call(companyAPI.userChangeCompany, action.id);

		console.log(companyUser);

		yield put({
			type: constants.USER_CHANGE_COMPANY_SUCCESS,
			companyName: companyUser.companyName
		});
	} catch (error) {
		yield put({
			type: constants.USER_CHANGE_COMPANY_FAILED
		});
	}
}

export default function* companySaga() {
	yield all([takeLatest(constants.FETCH_COMPANY_USERS, fetchCompanyUsers)]);
	yield all([takeLatest(constants.USER_CHANGE_COMPANY, userChagngeCompany)]);
}
