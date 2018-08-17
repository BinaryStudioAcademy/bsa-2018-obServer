import * as constants from './constants';
import { LogAction, AddNewLog } from './actions';
import { LogState } from '../../types/LogState';
import { defaultState } from '../defaultState';
import { LogsState } from '../../types/LogsState';

export function logReducer(
	state: LogState = defaultState.log,
	action: LogAction
): LogState {
	switch (action.type) {
		case constants.FETCH_LOG:
		case constants.FETCH_LOG_SUCCESS:
			return {
				...state,
				logType: action.log.logType,
				data: action.log.data,
				timestamp: action.log.timestamp,
				serverId: action.log.serverId
			};
		default:
			return state;
	}
}

export function logsReducer(
	state: LogsState = defaultState.logs,
	action: AddNewLog
): LogsState {
	switch (action.type) {
		case constants.ADD_NEW_LOG:
			return {
				...state,
				logs: [
					{
						logType: action.log.logType,
						data: action.log.data,
						timestamp: action.log.timestamp,
						serverId: action.log.serverId
					}
				]
			};
		default:
			return state;
	}
}

export function fetchingState(state = 'unstarted', action: LogAction) {
	switch (action.type) {
		case constants.FETCH_LOG_SUCCESS:
			return 'success';
		case constants.FETCH_LOG_FAILED:
			return 'failed';
		case constants.FETCH_LOG:
			return 'pending';
		default:
			return state;
	}
}
