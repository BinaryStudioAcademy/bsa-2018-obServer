import { takeLatest, put, call, all, take } from 'redux-saga/effects';
import * as constants from './constants';
import { GetLogs, GetNewCpuLog, GetNewMemoryLog } from './actions';

const logsData = [
	{
		companyToken: 'LOG_COLLECT_SECRET_TOKEN',
		data: {
			freeMemory: 651,
			allMemory: 8247,
			freeMemoryPercentage: 7
		},
		logType: 'MEMORY_SERVER',
		timestamp: '2018-08-22T20:15:42.228Z'
	},
	{
		companyToken: 'LOG_COLLECT_SECRET_TOKEN',
		data: {
			freeMemory: 524,
			allMemory: 8247,
			freeMemoryPercentage: 3
		},
		logType: 'MEMORY_SERVER',
		timestamp: '2018-08-22T20:15:45.228Z'
	},
	{
		companyToken: 'LOG_COLLECT_SECRET_TOKEN',
		data: {
			cores: [
				{ coreLoadPercentages: 91, coreName: 'core0' },
				{ coreLoadPercentages: 67, coreName: 'core1' },
				{ coreLoadPercentages: 91, coreName: 'core2' },
				{ coreLoadPercentages: 67, coreName: 'core3' }
			]
		},
		logType: 'CPU_SERVER',
		timestamp: '2018-08-22T20:15:48.436Z'
	},
	{
		companyToken: 'LOG_COLLECT_SECRET_TOKEN',
		data: {
			cores: [
				{ coreLoadPercentages: 93, coreName: 'core0' },
				{ coreLoadPercentages: 55, coreName: 'core1' },
				{ coreLoadPercentages: 92, coreName: 'core2' },
				{ coreLoadPercentages: 77, coreName: 'core3' }
			]
		},
		logType: 'CPU_SERVER',
		timestamp: '2018-08-22T20:15:49.436Z'
	}
];

const cpuLogData = [
	{
		companyToken: 'LOG_COLLECT_SECRET_TOKEN',
		data: {
			cores: [
				{ coreLoadPercentages: 93, coreName: 'core0' },
				{ coreLoadPercentages: 55, coreName: 'core1' },
				{ coreLoadPercentages: 92, coreName: 'core2' },
				{ coreLoadPercentages: 77, coreName: 'core3' }
			]
		},
		logType: 'CPU_SERVER',
		timestamp: '2018-08-22T20:15:49.436Z'
	}
];

const memoryLogData = [
	{
		companyToken: 'LOG_COLLECT_SECRET_TOKEN',
		data: {
			freeMemory: 651,
			allMemory: 8247,
			freeMemoryPercentage: 7
		},
		logType: 'MEMORY_SERVER',
		timestamp: '2018-08-22T20:15:42.228Z'
	}
];

function* getLogs(action: GetLogs) {
	try {
		console.log(action);

		yield put({
			type: constants.GET_NEW_MEMORY_LOG_SUCCESS,
			cpuLogs: logsData
		});
	} catch (err) {
		yield put({
			type: constants.GET_LOGS_FAILED
		});
	}
}

function* memoryLogs(action: GetNewCpuLog) {
	try {
		yield put({
			type: constants.GET_NEW_MEMORY_LOG_SUCCESS,
			payload: {
				memoryLogs: memoryLogData
			}
		});
	} catch (err) {
		yield put({
			type: constants.GET_LOGS_FAILED
		});
	}
}

function* cpuLogs(action: GetNewMemoryLog) {
	try {
		yield put({
			type: constants.GET_NEW_CPU_LOG_SUCCESS,
			payload: {
				cpuLogs: cpuLogData
			}
		});
	} catch (err) {
		yield put({
			type: constants.GET_LOGS_FAILED
		});
	}
}

export default function* logsSaga() {
	yield all([
		takeLatest(constants.GET_LOGS, getLogs),
		takeLatest(constants.GET_NEW_MEMORY_LOG, memoryLogs),
		takeLatest(constants.GET_NEW_CPU_LOG, cpuLogs)
	]);
}
