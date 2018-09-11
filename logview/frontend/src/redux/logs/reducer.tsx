import * as constants from './constants';
import { LogAction } from './actions';
import {
	CpuLogState,
	MemoryLogState,
	HttpStatsState,
	LogMessagesState,
	FiltersState,
	NotificationState
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
	state: Array<Array<HttpStatsState>> = defaultState.httpStats,
	action: LogAction
): Array<Array<HttpStatsState>> {
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

export function filtersReducer(
	state: FiltersState = defaultState.filters,
	action: LogAction
): FiltersState {
	switch (action.type) {
		case constants.HANDLE_ACTIVE_APP:
			return { ...state, activeApp: action.payload };
		case constants.HANDLE_TIME_RANGE:
			return { ...state, timeRange: action.payload };
		case constants.HANDLE_LOG_LEVEL:
			let level = Object.keys(action.payload)[0];
			return {
				...state,
				logLevels: {
					...state.logLevels,
					[level]: action.payload[level]
				}
			};
		default:
			return state;
	}
}

export function notificationReducer(
	state: Array<NotificationState> = defaultState.notificationLogs,
	action: LogAction
): Array<NotificationState> {
	switch (action.type) {
		case constants.GET_NEW_NOTIFICATION_SUCCESS:
			return [...state, ...action.payload.notificationLogs];
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
		case constants.GET_NEW_NOTIFICATION_SUCCESS:
			return 'success';
		case constants.GET_NEW_CPU_LOG_FAILED:
		case constants.GET_NEW_MEMORY_LOG_FAILED:
		case constants.GET_NEW_HTTP_STATS_FAILED:
		case constants.GET_LOG_MESSAGES_FAILED:
		case constants.GET_NEW_NOTIFICATION_FAILED:
			return 'failed';
		case constants.GET_NEW_CPU_LOG:
		case constants.GET_NEW_MEMORY_LOG:
		case constants.GET_NEW_HTTP_STATS:
		case constants.GET_LOG_MESSAGES:
		case constants.GET_NEW_NOTIFICATION:
			return 'pending';
		default:
			return state;
	}
}
