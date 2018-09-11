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
		if (index > 0) {
			let obj = {};
			obj['usedMemory'] = log.allMemory - log.freeMemory;
			obj['timestamp'] = log.timestamp;
			logs.push(obj);
		}
	});
	return logs;
}

export function countHttpParser(httpStats) {
	const logs = [];
	httpStats.forEach(log => {
		let obj = {};
		obj['count'] = log.data.requestsCount;
		obj['timestamp'] = log.timestamp;
		logs.push(obj);
	});
	return logs;
}

export function countRoutesParser(httpStats) {
	let logs = [];
	let counts = {};
	httpStats.forEach(log => {
		counts[log.data.route] =
			(log.data.requestsCount || 0) + (counts[log.data.route] || 0);
	});

	for (var route in counts) {
		let obj = {};
		obj['count'] = counts[route];
		obj['route'] = route;
		logs.push(obj);
	}

	return logs;
}
