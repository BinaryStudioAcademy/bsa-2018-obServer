import * as constants from './constants';

export interface FetchLogs {
	type: constants.FETCH_LOGS;
}

export interface FetchLogsSuccess {
	type: constants.FETCH_LOGS_SUCCESS;
}

export interface FetchLogsFail {
	type: constants.FETCH_LOGS_FAILED;
}

export function fetchLogs(): FetchLogs {
	return {
		type: constants.FETCH_LOGS
	};
}

export type LogAction = FetchLogs | FetchLogsFail | FetchLogsSuccess;
