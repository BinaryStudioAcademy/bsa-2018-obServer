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
​
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
​
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