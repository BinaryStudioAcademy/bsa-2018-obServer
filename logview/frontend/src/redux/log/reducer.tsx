import * as constants from './constants';
import { LogAction } from './actions';
import { LogState } from '../../types/LogState';
import { defaultState } from '../defaultState';

export function logReducer(
	state: LogState = defaultState.logs,
	action: LogAction
): LogState {
	switch (action.type) {
		case constants.FETCH_LOGS:
		case constants.FETCH_LOGS_SUCCESS:
			return {
				...state,
				logType: action.logType,
				data: action.data,
				timestamp: action.timestamp,
				serverId: action.serverId
			};
		default:
			return state;
	}
}

export function fetchingState(state = 'unstarted', action: LogAction) {
	switch (action.type) {
		case constants.FETCH_LOGS_SUCCESS:
			return 'success';
		case constants.FETCH_LOGS_FAILED:
			return 'failed';
		case constants.FETCH_LOGS:
			return 'pending';
		default:
			return state;
	}
}
