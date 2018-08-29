import * as constants from './constants';
import { LogAction } from './actions';
import { CpuLogState, MemoryLogState } from '../../types/LogsState';
import { defaultState } from '../defaultState';

export function cpuLogsReducer(
	state: Array<CpuLogState> = defaultState.cpuLogs,
	action: LogAction
): Array<CpuLogState> {
	switch (action.type) {
		case constants.GET_NEW_CPU_LOG:
			return [...state];
		case constants.GET_NEW_CPU_LOG_SUCCESS:
			return [...state, ...action.payload.cpuLogs];
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
			return [...state, ...action.payload.memoryLogs];
		default:
			return state;
	}
}
