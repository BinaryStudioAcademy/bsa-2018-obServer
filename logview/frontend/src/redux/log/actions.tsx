import * as constants from './constants';

export interface FetchLog {
	type: constants.FETCH_LOG;
}

export interface FetchLogSuccess {
	type: constants.FETCH_LOG_SUCCESS;
}

export interface FetchLogFail {
	type: constants.FETCH_LOG_FAILED;
}

export interface FetchLogs {
	type: constants.FETCH_LOGS;
}

export interface FetchLogsSuccess {
	type: constants.FETCH_LOGS_SUCCESS;
}

export interface FetchLogsFail {
	type: constants.FETCH_LOGS_FAILED;
}

export type LogAction =
	| FetchLog
	| FetchLogFail
	| FetchLogSuccess
	| FetchLogs
	| FetchLogsFail
	| FetchLogsSuccess;
