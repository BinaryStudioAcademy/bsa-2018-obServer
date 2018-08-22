import 'regenerator-runtime/runtime';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { settingsAPI } from '../../services';
import { ChangeSettings, FetchSettings } from './actions';
import * as constants from './constants';

function* changeSettings(action: ChangeSettings) {
	try {
		const currentSettings = yield call(settingsAPI.updateSettings, {
			serverMemory: action.serverMemory,
			serverCPU: action.serverCPU,
			notificationServerIsDown: action.notificationServerIsDown,
			notificationHighRequest: action.notificationHighRequest,
			appsMemory: action.appsMemory,
			appsCPU: action.appsCPU,
			appsErrorLog: action.appsErrorLog,
			appsHttp: action.appsHttp,
			appsSoket: action.appsSoket,
			listeningPorts: action.listeningPorts
		});

		yield put({
			type: constants.CHANGE_SETTINGS_SUCCESS,
			payload: {
				...currentSettings
			}
		});
	} catch (error) {
		yield put({
			type: constants.CHANGE_SETTINGS_FAILED
		});
	}
}

function* fetchSettings(action: FetchSettings) {
	try {
		const currentSettings = yield call(settingsAPI.fetchSettings);

		yield put({
			type: constants.FETCH_SETTINGS_SUCCESS,
			payload: {
				...currentSettings
			}
		});
	} catch (error) {
		yield put({
			type: constants.FETCH_SETTINGS_FAILED
		});
	}
}

export default function* settingsSaga() {
	yield all([
		takeLatest(constants.CHANGE_SETTINGS, changeSettings),
		takeLatest(constants.FETCH_SETTINGS, fetchSettings)
	]);
}
