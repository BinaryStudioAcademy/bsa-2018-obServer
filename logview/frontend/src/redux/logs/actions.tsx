import * as constants from './constants';
import {
	CpuLogState,
	MemoryLogState,
	HttpStatsState,
	LogMessagesState,
	NotificationState
} from '../../types/LogsState';
import { ActiveAppState } from '../../types/AppsState';

export interface GetLogs {
	type: constants.GET_LOGS;
}

export interface GetLogsSuccess {
	type: constants.GET_LOGS_SUCCESS;
}

export interface GetLogsFail {
	type: constants.GET_LOGS_FAILED;
}

export interface GetNewMemoryLog {
	type: constants.GET_NEW_MEMORY_LOG;
}

export interface GetNewMemoryLogSuccess {
	type: constants.GET_NEW_MEMORY_LOG_SUCCESS;
	payload: {
		memoryLogs: Array<MemoryLogState>;
	};
}

export interface GetNewMemoryLogFail {
	type: constants.GET_NEW_MEMORY_LOG_FAILED;
}

export interface GetNewCpuLog {
	type: constants.GET_NEW_CPU_LOG;
}

export interface GetNewCpuLogSuccess {
	type: constants.GET_NEW_CPU_LOG_SUCCESS;
	payload: {
		cpuLogs: Array<CpuLogState>;
	};
}

export interface GetNewCpuLogFail {
	type: constants.GET_NEW_CPU_LOG_FAILED;
}

export interface GetNewHttpStats {
	type: constants.GET_NEW_HTTP_STATS;
	appId: string;
	interval: number;
}

export interface GetNewHttpStatsSuccess {
	type: constants.GET_NEW_HTTP_STATS_SUCCESS;
	payload: {
		httpStats: Array<Array<HttpStatsState>>;
	};
}

export interface GetNewHttpStatsFail {
	type: constants.GET_NEW_HTTP_STATS_FAILED;
}

export interface GetLogMessages {
	type: constants.GET_LOG_MESSAGES;
	companyId: string;
}

export interface GetLogMessagesSuccess {
	type: constants.GET_LOG_MESSAGES_SUCCESS;
	payload: {
		logMessages: Array<LogMessagesState>;
	};
}

export interface GetLogMessagesFail {
	type: constants.GET_LOG_MESSAGES_FAILED;
}

export interface HandleActiveApp {
	type: constants.HANDLE_ACTIVE_APP;
	payload: ActiveAppState;
}

export interface HandleTimeRange {
	type: constants.HANDLE_TIME_RANGE;
	payload: {};
}

export interface HandleLogLevels {
	type: constants.HANDLE_LOG_LEVEL;
	payload: {};
}

export interface GetNewNotification {
	type: constants.GET_NEW_NOTIFICATION;
}

export interface GetNewNotificationSuccess {
	type: constants.GET_NEW_NOTIFICATION_SUCCESS;
	payload: {
		notificationLogs: Array<NotificationState>;
	};
}

export interface GetNewNotificationFail {
	type: constants.GET_NEW_NOTIFICATION_FAILED;
}

export type LogAction =
	| GetLogs
	| GetLogsFail
	| GetLogsSuccess
	| GetNewMemoryLog
	| GetNewMemoryLogFail
	| GetNewMemoryLogSuccess
	| GetNewCpuLog
	| GetNewCpuLogFail
	| GetNewCpuLogSuccess
	| GetNewHttpStats
	| GetNewHttpStatsFail
	| GetNewHttpStatsSuccess
	| GetLogMessages
	| GetLogMessagesSuccess
	| GetLogMessagesFail
	| HandleActiveApp
	| HandleTimeRange
	| HandleLogLevels
	| GetNewNotification
	| GetNewNotificationSuccess
	| GetNewNotificationFail;

export function getLogs(): GetLogs {
	return {
		type: constants.GET_LOGS
	};
}

export function getLogsSuccess(): GetLogsSuccess {
	return {
		type: constants.GET_LOGS_SUCCESS
	};
}

export function getLogssFail(): GetLogsFail {
	return {
		type: constants.GET_LOGS_FAILED
	};
}

export function getNewMemoryLog(): GetNewMemoryLog {
	return {
		type: constants.GET_NEW_MEMORY_LOG
	};
}

export function getNewMemoryLogSuccess(payload: {
	memoryLogs: Array<MemoryLogState>;
}): GetNewMemoryLogSuccess {
	return {
		type: constants.GET_NEW_MEMORY_LOG_SUCCESS,
		payload
	};
}

export function getNewMemoryLogsFail(): GetNewMemoryLogFail {
	return {
		type: constants.GET_NEW_MEMORY_LOG_FAILED
	};
}

export function getNewCpuLog(): GetNewCpuLog {
	return {
		type: constants.GET_NEW_CPU_LOG
	};
}

export function getNewCpuLogSuccess(payload: {
	cpuLogs: Array<CpuLogState>;
}): GetNewCpuLogSuccess {
	return {
		type: constants.GET_NEW_CPU_LOG_SUCCESS,
		payload
	};
}

export function getNewCpuLogsFail(): GetNewCpuLogFail {
	return {
		type: constants.GET_NEW_CPU_LOG_FAILED
	};
}

export function getNewHttpStats(
	appId: string,
	interval: number
): GetNewHttpStats {
	return {
		type: constants.GET_NEW_HTTP_STATS,
		appId,
		interval
	};
}

export function getLogMessages(companyId: string = ''): GetLogMessages {
	return {
		type: constants.GET_LOG_MESSAGES,
		companyId
	};
}

export function getLogMessagesSuccess(payload: {
	logMessages: Array<LogMessagesState>;
}): GetLogMessagesSuccess {
	return {
		type: constants.GET_LOG_MESSAGES_SUCCESS,
		payload
	};
}

export function getLogMessagesFail(): GetLogMessagesFail {
	return {
		type: constants.GET_LOG_MESSAGES_FAILED
	};
}

export function handleActiveApp(payload: ActiveAppState): HandleActiveApp {
	return {
		type: constants.HANDLE_ACTIVE_APP,
		payload
	};
}

export function handleTimeRange(payload: {}): HandleTimeRange {
	return {
		type: constants.HANDLE_TIME_RANGE,
		payload
	};
}

export function handleLogLevels(payload: {}): HandleLogLevels {
	return {
		type: constants.HANDLE_LOG_LEVEL,
		payload
	};
}

export function getNewNotification(): GetNewNotification {
	return {
		type: constants.GET_NEW_NOTIFICATION
	};
}

export function getNewNotificationSuccess(payload: {
	notificationLogs: Array<NotificationState>;
}): GetNewNotificationSuccess {
	return {
		type: constants.GET_NEW_NOTIFICATION_SUCCESS,
		payload
	};
}

export function getNewNotificationFail(): GetNewNotificationFail {
	return {
		type: constants.GET_NEW_NOTIFICATION_FAILED
	};
}
