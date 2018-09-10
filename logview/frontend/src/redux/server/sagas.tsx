import 'regenerator-runtime/runtime';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { serverAPI } from '../../services';
import { ChangeServerSettings, FetchServerSettings } from './actions';
import * as constants from './constants';

function* changeServerSettings(action: ChangeServerSettings) {
	try {
		const currentSettings = yield call(serverAPI.updateSetting, {
			logcollectAddress: action.logcollectAddress,
			logcollectPort: action.logcollectPort,
			companyId: action.companyId
		});
		const { id, logcollectPort, logcollectAddress } = currentSettings.data;
		yield put({
			type: constants.CHANGE_SERVER_SETTINGS_SUCCESS,
			payload: {
				logcollectAddress: logcollectAddress,
				logcollectPort: logcollectPort,
				companyId: id
			}
		});
	} catch (error) {
		yield put({
			type: constants.CHANGE_SERVER_SETTINGS_FAILED
		});
	}
}

function* fetchServerSettings(action: FetchServerSettings) {
	try {
		const currentSettings = yield call(serverAPI.getSetting);
		const { id, logcollectPort, logcollectAddress } = currentSettings.data;
		yield put({
			type: constants.FETCH_SERVER_SETTINGS_SUCCESS,
			payload: {
				logcollectAddress: logcollectAddress,
				logcollectPort: logcollectPort,
				companyId: id
			}
		});
	} catch (error) {
		yield put({
			type: constants.FETCH_SERVER_SETTINGS_FAILED
		});
	}
}

export default function* settingsSaga() {
	yield all([
		takeLatest(constants.CHANGE_SERVER_SETTINGS, changeServerSettings),
		takeLatest(constants.FETCH_SERVER_SETTINGS, fetchServerSettings)
	]);
}
