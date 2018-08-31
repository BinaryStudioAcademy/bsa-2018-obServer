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
		if (index > 0) {
			let obj = {};
			obj['usedMemory'] = log.data.allMemory - log.data.freeMemory;
			obj['timestamp'] = log.timestamp;
			logs.push(obj);
		}
	});
	return logs;
}
