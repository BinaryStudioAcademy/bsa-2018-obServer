import * as constants from './constants';
import { LogState } from 'src/types/LogState';
import { LogsState } from '../../types/LogsState';

export interface FetchLog {
	type: constants.FETCH_LOG;
	log: LogState;
}

export interface FetchLogSuccess {
	type: constants.FETCH_LOG_SUCCESS;
	log: LogState;
}

export interface FetchLogFail {
	type: constants.FETCH_LOG_FAILED;
}

export interface AddNewLog {
	type: constants.ADD_NEW_LOG;
	log: LogState;
}

export function fetchLog(
	logType: string,
	data: { message: string; status: string },
	timestamp: number,
	serverId: number
): FetchLog {
	return {
		type: constants.FETCH_LOG,
		log: {
			logType,
			data,
			timestamp,
			serverId
		}
	};
}

export function fetchLogSuccess(
	logType: string,
	data: { message: string; status: string },
	timestamp: number,
	serverId: number
): FetchLogSuccess {
	return {
		type: constants.FETCH_LOG_SUCCESS,
		log: {
			logType,
			data,
			timestamp,
			serverId
		}
	};
}

export function fetchLogsFail(): FetchLogFail {
	return {
		type: constants.FETCH_LOG_FAILED
	};
}

export function addNewLog(
	logType: string,
	data: { message: string; status: string },
	timestamp: number,
	serverId: number
): AddNewLog {
	return {
		type: constants.ADD_NEW_LOG,
		log: {
			logType,
			data,
			timestamp,
			serverId
		}
	};
}

export type LogAction = FetchLog | FetchLogFail | FetchLogSuccess | AddNewLog;
