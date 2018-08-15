import * as constants from './constants';
import { LogState } from 'src/types/LogState';

export interface FetchLogs extends LogState {
	type: constants.FETCH_LOGS;
}

export interface FetchLogsSuccess {
	type: constants.FETCH_LOGS_SUCCESS;
}

export interface FetchLogsFail {
	type: constants.FETCH_LOGS_FAILED;
}

export function fetchLogs(
	logs: [
		{
			logType: string;
			data: object;
			timestamp: Date;
			serverId: string;
		}
	]
): FetchLogs {
	return {
		type: constants.FETCH_LOGS,
		logs
	};
}

export function fetchLogsSuccess(): FetchLogsSuccess {
	return {
		type: constants.FETCH_LOGS_SUCCESS
	};
}

export function fetchLogsFail(): FetchLogsFail {
	return {
		type: constants.FETCH_LOGS_FAILED
	};
}

export type LogAction = FetchLogs | FetchLogsFail | FetchLogsSuccess;
