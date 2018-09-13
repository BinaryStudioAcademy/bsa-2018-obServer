import moment from 'moment';

export function cpuParser(cpuLogs) {
	const logs = [];
	cpuLogs.forEach((log, index) => {
		if (index > 0) {
			let obj = {};
			log.cores.forEach(core => {
				obj[core.coreName] = core.coreLoadPercentages;
			});
			obj['timestamp'] = log.timestamp;
			obj['totalLoadPercentages'] = log.totalLoadPercenteges;
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
			obj['freeMemory'] = log.freeMemory;
			obj['usedMemory'] = log.allMemory - log.freeMemory;
			obj['timestamp'] = log.timestamp;
			obj['freeMemoryPercentage'] = log.freeMemoryPercentage;
			logs.push(obj);
		}
	});
	return logs;
}
export function memoryMbParser(memoryLogs) {
	const logs = [];
	memoryLogs.forEach((log, index) => {
		let obj = {};
		obj['usedMemory'] = log.allMemory - log.freeMemory;
		obj['timestamp'] = log.timestamp;
		logs.push(obj);
	});
	return logs;
}

export function httpParser(httpStats) {
	const logs = [];
	httpStats.forEach(array => {
		if (array.length > 0) {
			array.forEach(log => {
				let obj = {};
				obj['timestamp'] = log.timestamp;
				obj['route'] = log.data.route;
				obj['method'] = log.data.method;
				obj['requestsCount'] = log.data.requestsCount;
				obj['bodySizeRequest'] = log.data.bodySizeRequest;
				obj['bodySizeResponse'] = log.data.bodySizeResponse;
				obj['responseTimeMin'] = log.data.responseTimeMin;
				obj['responseTimeMax'] = log.data.responseTimeMax;
				obj['responseTimeAvg'] = log.data.responseTimeAvg;

				logs.push(obj);
			});
		}
	});
	return logs;
}

export function countHttpParser(httpStats, timeRange) {
	const logs = [];
	let prevTimeOX = '2018-09-03T17:02:16.121Z';
	httpStats.forEach(array => {
		let obj = {};
		obj['count'] = 0;
		obj['timestamp'] = moment(prevTimeOX)
			.add(convertTimeRangeToInterval(timeRange), 'ms')
			.format('YYYY-MM-DD HH:mm:ss');
		if (array.length > 0) {
			array.forEach(log => {
				obj['count'] += log.data.requestsCount;
				obj['timestamp'] = log.timestamp;
			});
		}
		prevTimeOX = obj['timestamp'];
		logs.push(obj);
	});
	return logs;
}

export function countRoutesParser(httpStats) {
	let logs = [],
		counts = {};
	httpStats.forEach(array => {
		if (array.length > 0) {
			array.forEach(log => {
				counts[log.data.route] =
					(log.data.requestsCount || 0) +
					(counts[log.data.route] || 0);
			});
		}
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
			return 600000;
		case 'last 30 minutes':
			return 1800000;
		case 'last 1 hour':
		case 'last hour':
			return 3600000;
		case 'last 3 hours':
			return 10800000;
		case 'last 5 hours':
			return 18000000;
		case 'last 12 hours':
			return 43200000;
		case 'last day':
		case 'last 24 hours':
			return 86400000;
		case 'last week':
			return 604800000;
		case 'last 30 days':
		case 'last  month':
			return 2592000000;
	}
}
