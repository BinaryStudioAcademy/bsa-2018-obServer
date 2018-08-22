import * as constants from './constants';
import { SettingsAction } from './actions';
import { SettingsState } from 'src/types/SettingsState';
import { defaultState } from '../defaultState';

export function settingsReducer(
	state: SettingsState = defaultState.settings,
	action: SettingsAction
): SettingsState {
	switch (action.type) {
		case constants.CHANGE_SETTINGS_SUCCESS:
		case constants.FETCH_SETTINGS_SUCCESS:
			return {
				...state,
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
			};
		default:
			return state;
	}
}

export function fetchingState(state = 'unstarted', action: SettingsAction) {
	switch (action.type) {
		case constants.FETCH_SETTINGS_SUCCESS:
		case constants.CHANGE_SETTINGS_SUCCESS:
			return 'success';
		case constants.FETCH_SETTINGS_FAILED:
		case constants.CHANGE_SETTINGS_FAILED:
			return 'failed';
		case constants.CHANGE_SETTINGS:
		case constants.FETCH_SETTINGS:
			return 'pending';
		default:
			return state;
	}
}
