import * as constants from './constants';
import { ServerState } from '../../types/ServerState';

/* change server settings */
export interface ChangeServerSettings extends ServerState {
	type: constants.CHANGE_SERVER_SETTINGS;
}

export interface ChangeServerSettingsSuccess {
	type: constants.CHANGE_SERVER_SETTINGS_SUCCESS;
	payload: ServerState;
}

export interface ChangeServerSettingsFail {
	type: constants.CHANGE_SERVER_SETTINGS_FAILED;
}

/* fetch server settings */
export interface FetchServerSettings {
	type: constants.FETCH_SERVER_SETTINGS;
}

export interface FetchServerSettingsSuccess {
	type: constants.FETCH_SERVER_SETTINGS_SUCCESS;
	payload: ServerState;
}

export interface FetchServerSettingsFail {
	type: constants.FETCH_SERVER_SETTINGS_FAILED;
}

export type ServerSettingsAction =
	| ChangeServerSettings
	| ChangeServerSettingsFail
	| ChangeServerSettingsSuccess
	| FetchServerSettings
	| FetchServerSettingsFail
	| FetchServerSettingsSuccess;

export function changeServerSettings(
	logcollectAddress: string,
	logcollectPort: string,
	companyId: string
): ChangeServerSettings {
	return {
		type: constants.CHANGE_SERVER_SETTINGS,
		logcollectAddress,
		logcollectPort,
		companyId
	};
}

export function fetchServerSettings(): FetchServerSettings {
	return {
		type: constants.FETCH_SERVER_SETTINGS
	};
}
