import * as constants from './constants';
import { SettingsState } from '../../types/SettingsState';

/* change settings */
export interface ChangeSettings extends SettingsState {
	type: constants.CHANGE_SETTINGS;
}

export interface ChangeSettingsSuccess {
	type: constants.CHANGE_SETTINGS_SUCCESS;
	payload: SettingsState;
}

export interface ChangeSettingsFail {
	type: constants.CHANGE_SETTINGS_FAILED;
}

/* fetch settings */
export interface FetchSettings {
	type: constants.FETCH_SETTINGS;
}

export interface FetchSettingsSuccess {
	type: constants.FETCH_SETTINGS_SUCCESS;
	payload: SettingsState;
}

export interface FetchSettingsFail {
	type: constants.FETCH_SETTINGS_FAILED;
}

export type SettingsAction =
	| ChangeSettings
	| ChangeSettingsFail
	| ChangeSettingsSuccess
	| FetchSettings
	| FetchSettingsFail
	| FetchSettingsSuccess;

export function changeSettings(
	serverMemory: boolean,
	serverCPU: boolean,
	notificationServerIsDown: boolean,
	notificationHighRequest: boolean,
	appsMemory: boolean,
	appsCPU: boolean,
	appsErrorLog: boolean,
	appsHttp: boolean,
	appsSoket: boolean,
	listeningPorts: string
): ChangeSettings {
	return {
		type: constants.CHANGE_SETTINGS,
		serverMemory,
		serverCPU,
		notificationServerIsDown,
		notificationHighRequest,
		appsMemory,
		appsCPU,
		appsErrorLog,
		appsHttp,
		appsSoket,
		listeningPorts
	};
}

export function fetchSettings(): FetchSettings {
	return {
		type: constants.FETCH_SETTINGS
	};
}
