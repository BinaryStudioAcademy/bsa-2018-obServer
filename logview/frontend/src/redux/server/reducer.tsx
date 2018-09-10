import * as constants from './constants';
import { ServerSettingsAction } from './actions';
import { ServerState } from '../../types/ServerState';
import { defaultState } from '../defaultState';

export function serverReducer(
	state: ServerState = defaultState.server,
	action: ServerSettingsAction
): ServerState {
	switch (action.type) {
		case constants.CHANGE_SERVER_SETTINGS_SUCCESS:
		case constants.FETCH_SERVER_SETTINGS_SUCCESS: {
			return {
				...action.payload
			};
		}
		default:
			return state;
	}
}

export function fetchingServerReducer(
	state = 'unstarted',
	action: ServerSettingsAction
) {
	switch (action.type) {
		case constants.FETCH_SERVER_SETTINGS_SUCCESS:
		case constants.CHANGE_SERVER_SETTINGS_SUCCESS:
			return 'success';
		case constants.FETCH_SERVER_SETTINGS_FAILED:
		case constants.CHANGE_SERVER_SETTINGS_FAILED:
			return 'failed';
		case constants.CHANGE_SERVER_SETTINGS:
		case constants.FETCH_SERVER_SETTINGS:
			return 'pending';
		default:
			return state;
	}
}
