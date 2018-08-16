import * as constants from './constants';
import { LogState } from 'src/types/LogState';

export interface FetchLogs {
	type: constants.FETCH_LOGS;
	logs: LogState;
}

export interface FetchLogsSuccess {
	type: constants.FETCH_LOGS_SUCCESS;
	logs: LogState;
}

export interface FetchLogsFail {
	type: constants.FETCH_LOGS_FAILED;
}

export function fetchLogs(
	logType: string,
	data: { message: string },
	timestamp: number,
	serverId: number
): FetchLogs {
	return {
		type: constants.FETCH_LOGS,
		logs: {
			logType,
			data,
			timestamp,
			serverId
		}
	};
}

export function fetchLogsSuccess(
	logType: string,
	data: { message: string },
	timestamp: number,
	serverId: number
): FetchLogsSuccess {
	return {
		type: constants.FETCH_LOGS_SUCCESS,
		logs: {
			logType,
			data,
			timestamp,
			serverId
		}
	};
}

export function fetchLogsFail(): FetchLogsFail {
	return {
		type: constants.FETCH_LOGS_FAILED
	};
}

export type LogAction = FetchLogs | FetchLogsFail | FetchLogsSuccess;
