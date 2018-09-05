import * as constants from './constants';
import { LogAction } from './actions';
import {
	CpuLogState,
	MemoryLogState,
	HttpStatsState,
	LogMessagesState
} from '../../types/LogsState';
import { defaultState } from '../defaultState';

export function cpuLogsReducer(
	state: Array<CpuLogState> = defaultState.cpuLogs,
	action: LogAction
): Array<CpuLogState> {
	switch (action.type) {
		case constants.GET_NEW_CPU_LOG:
			return [...state];
		case constants.GET_NEW_CPU_LOG_SUCCESS:
			if (state.length > 6) {
				state.shift();
				return [...state, ...action.payload.cpuLogs];
			} else {
				return [...state, ...action.payload.cpuLogs];
			}
		default:
			return state;
	}
}

export function memoryLogsReducer(
	state: Array<MemoryLogState> = defaultState.memoryLogs,
	action: LogAction
): Array<MemoryLogState> {
	switch (action.type) {
		case constants.GET_NEW_MEMORY_LOG:
			return [...state];
		case constants.GET_NEW_MEMORY_LOG_SUCCESS:
			if (state.length > 6) {
				state.shift();
				return [...state, ...action.payload.memoryLogs];
			} else {
				return [...state, ...action.payload.memoryLogs];
			}
		default:
			return state;
	}
}

export function httpStatsReducer(
	state: Array<HttpStatsState> = defaultState.httpStats,
	action: LogAction
): Array<HttpStatsState> {
	switch (action.type) {
		case constants.GET_NEW_HTTP_STATS_SUCCESS:
			return [...action.payload.httpStats];
		default:
			return state;
	}
}

export function logMessagesReducer(
	state: Array<LogMessagesState> = defaultState.logMessages,
	action: LogAction
): Array<LogMessagesState> {
	switch (action.type) {
		case constants.GET_LOG_MESSAGES_SUCCESS:
			return [...action.payload.logMessages];
		default:
			return state;
	}
}

export function fetchingLogsReducer(state = 'unstarted', action: LogAction) {
	switch (action.type) {
		case constants.GET_NEW_CPU_LOG_SUCCESS:
		case constants.GET_NEW_MEMORY_LOG_SUCCESS:
		case constants.GET_NEW_HTTP_STATS_SUCCESS:
		case constants.GET_LOG_MESSAGES_SUCCESS:
			return 'success';
		case constants.GET_NEW_CPU_LOG_FAILED:
		case constants.GET_NEW_MEMORY_LOG_FAILED:
		case constants.GET_NEW_HTTP_STATS_FAILED:
		case constants.GET_LOG_MESSAGES_FAILED:
			return 'failed';
		case constants.GET_NEW_CPU_LOG:
		case constants.GET_NEW_MEMORY_LOG:
		case constants.GET_NEW_HTTP_STATS:
		case constants.GET_LOG_MESSAGES:
			return 'pending';
		default:
			return state;
	}
}
