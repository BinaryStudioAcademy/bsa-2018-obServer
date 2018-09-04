import * as constants from './constants';
import {
	CpuLogState,
	MemoryLogState,
	HttpStatsState
} from '../../types/LogsState';

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
	companyId: string;
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
	| GetNewHttpStatsSuccess;

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
	companyId: string,
	appId: string,
	interval: number
): GetNewHttpStats {
	return {
		type: constants.GET_NEW_HTTP_STATS,
		companyId,
		appId,
		interval
	};
}
