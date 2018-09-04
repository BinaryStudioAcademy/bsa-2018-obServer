import { array } from 'prop-types';

export function cpuParser(cpuLogs) {
	const logs = [];
	cpuLogs.forEach((log, index) => {
		if (index > 0) {
			let obj = {};
			log.data.cores.forEach(core => {
				obj[core.coreName] = core.coreLoadPercentages;
			});
			obj['timestamp'] = log.timestamp;
			logs.push(obj);
		}
	});
	return logs;
}

export function memoryParser(memoryLogs) {
	const logs = [];
	memoryLogs.forEach((log, index) => {
		if (index > 0) {
			let obj = {};
			obj['freeMemory'] = log.data.freeMemory;
			obj['usedMemory'] = log.data.allMemory - log.data.freeMemory;
			obj['timestamp'] = log.timestamp;
			logs.push(obj);
		}
	});
	return logs;
}

export function memoryMbParser(memoryLogs) {
	const logs = [];
	memoryLogs.forEach((log, index) => {
		let obj = {};
		obj['usedMemory'] = log.data.allMemory - log.data.freeMemory;
		obj['timestamp'] = log.timestamp;
		logs.push(obj);
	});
	return logs;
}

export function httpParser(httpStats) {
	const logs = [];
	httpStats.forEach(array => {
		array.forEach(log => {
			let obj = log;
			logs.push(obj);
		});
	});
	return logs;
}

export function countHttpParser(httpStats) {
	const logs = [];
	httpStats.forEach(array => {
		array.forEach(log => {
			let obj = {};
			obj['count'] = log.data.requestsCount;
			obj['timestamp'] = log.timestamp;
			logs.push(obj);
		});
	});
	return logs;
}

export function countRoutesParser(httpStats) {
	let logs = [],
		counts = {};
	httpStats.forEach(array => {
		array.forEach(log => {
			counts[log.data.route] =
				(log.data.requestsCount || 0) + (counts[log.data.route] || 0);
		});
	});

	for (var route in counts) {
		let obj = {};
		obj['count'] = counts[route];
		obj['route'] = route;
		logs.push(obj);
	}

	return logs;
}

export function convertTimeRangeToInterval(timeRange) {
	switch (timeRange) {
		case 'last 10 minutes':
		case 'last 30 minutes':
			return 60000;
		case 'last 1 hour':
			return 300000;
		case 'last 3 hours':
			return 600000;
		case 'last 5 hours':
			return 900000;
		case 'last 12 hours':
			return 1800000;
		case 'last day':
		case 'last 24 hours':
			return 3600000;
		case 'last week':
		case 'last 30 days':
		case 'last  month':
			return 86400000;
	}
}
