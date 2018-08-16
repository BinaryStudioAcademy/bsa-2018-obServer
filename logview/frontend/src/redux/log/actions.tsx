import * as constants from './constants';
import { LogState } from 'src/types/LogState';

export interface FetchLogs extends LogState {
	type: constants.FETCH_LOGS;
}

export interface FetchLogsSuccess extends LogState {
	type: constants.FETCH_LOGS_SUCCESS;
}

export interface FetchLogsFail {
	type: constants.FETCH_LOGS_FAILED;
}

export function fetchLogs(
	logType: string,
	data: object,
	timestamp: Date,
	serverId: string
): FetchLogs {
	return {
		type: constants.FETCH_LOGS,
		logType,
		data,
		timestamp,
		serverId
	};
}

export function fetchLogsSuccess(
	logType: string,
	data: object,
	timestamp: Date,
	serverId: string
): FetchLogsSuccess {
	return {
		type: constants.FETCH_LOGS_SUCCESS,
		logType,
		data,
		timestamp,
		serverId
	};
}

export function fetchLogsFail(): FetchLogsFail {
	return {
		type: constants.FETCH_LOGS_FAILED
	};
}

export type LogAction = FetchLogs | FetchLogsFail | FetchLogsSuccess;
