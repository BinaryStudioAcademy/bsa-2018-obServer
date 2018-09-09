import * as constants from './constants';
import { SettingsAction } from './actions';
import { SettingsState } from '../../types/SettingsState';
import { defaultState } from '../defaultState';

export function settingsReducer(
	state: SettingsState = defaultState.settings,
	action: SettingsAction
): SettingsState {
	switch (action.type) {
		case constants.CHANGE_SETTINGS_SUCCESS:
		case constants.FETCH_SETTINGS_SUCCESS: {
			return {
				...state,
				serverMemory: action.payload.serverMemory,
				serverCPU: action.payload.serverCPU,
				notificationServerIsDown:
					action.payload.notificationServerIsDown,
				notificationHighRequest: action.payload.notificationHighRequest,
				appsMemory: action.payload.appsMemory,
				appsCPU: action.payload.appsCPU,
				appsErrorLog: action.payload.appsErrorLog,
				appsHttp: action.payload.appsHttp,
				appsSoket: action.payload.appsSoket
			};
		}
		default:
			return state;
	}
}

export function fetchingSettingsReducer(
	state = 'unstarted',
	action: SettingsAction
) {
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
