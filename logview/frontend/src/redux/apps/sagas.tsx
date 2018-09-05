import 'regenerator-runtime/runtime';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { appsAPI } from '../../services';
import { FetchAppsList, AddNewApp } from './actions';
import * as constants from './constants';

function* fetchAppsList(action: FetchAppsList) {
	try {
		const currentApps = yield call(appsAPI.getAllApps);

		yield put({
			type: constants.FETCH_APPS_LIST_SUCCESS,
			payload: [currentApps]
		});
	} catch (error) {
		yield put({
			type: constants.FETCH_APPS_LIST_FAILED
		});
	}
}

function* addNewApp(action: AddNewApp) {
	try {
		const newApp = yield call(appsAPI.addNewApp);
		yield put({
			type: constants.ADD_NEW_APP_SUCCESS,
			payload: {
				...newApp
			}
		});
	} catch (error) {
		yield put({
			type: constants.ADD_NEW_APP_FAILED
		});
	}
}

export default function* settingsSaga() {
	yield all([
		takeLatest(constants.FETCH_APPS_LIST, fetchAppsList),
		takeLatest(constants.ADD_NEW_APP, addNewApp)
	]);
}
