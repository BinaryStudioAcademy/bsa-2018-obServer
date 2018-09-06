import 'regenerator-runtime/runtime';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { appsAPI } from '../../services';
import { FetchAppsList, AddNewApp, DeleteApp } from './actions';
import * as constants from './constants';
import { parseAppsData } from '../../services/reduxDataParser';

function* fetchAppsList(action: FetchAppsList) {
	try {
		const currentApps = yield call(appsAPI.getAllApps);

		yield put({
			type: constants.FETCH_APPS_LIST_SUCCESS,
			payload: parseAppsData(currentApps.data)
		});
	} catch (error) {
		yield put({
			type: constants.FETCH_APPS_LIST_FAILED
		});
	}
}

function* addNewApp(action: AddNewApp) {
	try {
		const newApp = yield call(appsAPI.addNewApp, action.name);
		yield put({
			type: constants.ADD_NEW_APP_SUCCESS,
			payload: {
				id: newApp.data.id,
				name: newApp.data.name
			}
		});
	} catch (error) {
		yield put({
			type: constants.ADD_NEW_APP_FAILED
		});
	}
}

function* deleteApp(action: DeleteApp) {
	try {
		yield call(appsAPI.deleteApp, action.id);
		console.log('deleted app', deleteApp);
		yield put({
			type: constants.DELETE_APP_SUCCESS,
			payload: action.id
		});
	} catch (error) {
		yield put({
			type: constants.DELETE_APP_FAILED
		});
	}
}

export default function* settingsSaga() {
	yield all([
		takeLatest(constants.FETCH_APPS_LIST, fetchAppsList),
		takeLatest(constants.ADD_NEW_APP, addNewApp),
		takeLatest(constants.DELETE_APP, deleteApp)
	]);
}
