/**
 * Returns errStats regarding provided period
 */
export function calcErrStats(logs, activeApp, timeRange) {
	// filter by app
	let filteredByApp = [];
	activeApp.length > 0
		? (filteredByApp = logs.filter(log => {
				return log.appId === activeApp;
		  }))
		: (filteredByApp = logs);
	if (filteredByApp.length === 0) {
		return [{ timestamp: Date.now(), errors: 0 }];
	}

	let startDateValue = defineStartDateValue(timeRange);

	const errorLogs = filteredByApp.filter(log => {
		let timestamp = new Date(log.timestamp);
		return log.logLevel === 0 && timestamp.valueOf() >= startDateValue;
	});
	if (errorLogs.length === 0) {
		return [{ timestamp: Date.now(), errors: 0 }];
	}

	switch (timeRange) {
		case 'last 10 minutes':
			// 10 chart bars
			return calcErrStatsByTime(errorLogs, startDateValue, 60000, 10);
		case 'last 30 minutes':
			// 30 chart bars
			return calcErrStatsByTime(errorLogs, startDateValue, 60000, 30);
		case 'last hour':
			// 12 chart bars
			return calcErrStatsByTime(errorLogs, startDateValue, 300000, 12);
		case 'last 5 hours':
			// 20 chart bars
			return calcErrStatsByTime(errorLogs, startDateValue, 900000, 20);
		case 'last 12 hours':
			// 12 chart bars
			return calcErrStatsByTime(errorLogs, startDateValue, 1800000, 24);
		case 'last 24 hours':
			// 24 chart bars
			return calcErrStatsByTime(errorLogs, startDateValue, 3600000, 24);
		case 'last week':
			// 8 chart bars
			return calcErrStatsByDate(errorLogs, startDateValue, 86400000, 8);
		case 'last 30 days':
			// 30 chart bars
			return calcErrStatsByDate(errorLogs, startDateValue, 86400000, 31);
		default:
			return [{ timestamp: Date.now(), errors: 0 }];
	}
}

function calcErrStatsByDate(errorLogs, startDateValue, stepValue, stepsNumber) {
	let res = [];
	let startDateStamp = startDateValue;
	let endDateStamp = startDateStamp + stepValue;

	for (let i = 0; i < stepsNumber; i++) {
		let item = { timestamp: 0, errors: 0 };
		let startDate = new Date(startDateStamp);
		let startDay = startDate.toDateString();
		let dayMidnight = new Date(startDay);
		item.timestamp = dayMidnight.valueOf();
		item.errors = errorLogs.filter(log => {
			let logDate = new Date(log.timestamp);
			let logDay = logDate.toDateString();
			return logDay === startDay;
		}).length;
		res.push(item);
		startDateStamp = endDateStamp;
		endDateStamp += stepValue;
	}
	return res;
}

function calcErrStatsByTime(errorLogs, startDateValue, stepValue, stepsNumber) {
	let res = [];
	let startDateStamp = startDateValue;
	let endDateStamp = startDateStamp + stepValue;

	for (let i = 0; i < stepsNumber; i++) {
		let item = { timestamp: 0, errors: 0 };
		item.timestamp = endDateStamp;
		item.errors = errorLogs.filter(log => {
			let timestamp = new Date(log.timestamp);
			return (
				timestamp.valueOf() >= startDateStamp &&
				timestamp.valueOf() < endDateStamp
			);
		}).length;
		res.push(item);
		startDateStamp = endDateStamp;
		endDateStamp += stepValue;
	}
	return res;
}

export function filterLogs(logs, activeApp, timeRange, logLevels) {
	const levels = {
		0: 'error',
		1: 'warn',
		2: 'info',
		3: 'verbose',
		4: 'debug',
		5: 'silly'
	};

	// filter by app
	let filteredByApp = [];
	activeApp.length > 0
		? (filteredByApp = logs.filter(log => {
				return log.appId === activeApp;
		  }))
		: (filteredByApp = logs);

	// filter by log level
	let filteredByLevel = [];
	filteredByApp.length > 0
		? (filteredByLevel = filteredByApp.filter(log => {
				return logLevels[levels[log.logLevel]] === true;
		  }))
		: (filteredByLevel = filteredByApp);

	// filter by date
	let filteredByDate = [];
	let startDateValue = defineStartDateValue(timeRange);
	filteredByLevel.length > 0
		? (filteredByDate = filteredByLevel.filter(log => {
				let timestamp = new Date(log.timestamp);
				return timestamp.valueOf() >= startDateValue;
		  }))
		: (filteredByDate = filteredByLevel);
	return filteredByDate;
}

function defineStartDateValue(timespan) {
	switch (timespan) {
		case 'last 10 minutes':
			return Date.now() - 600000;
		case 'last 30 minutes':
			return Date.now() - 1800000;
		case 'last hour':
			return Date.now() - 3600000;
		case 'last 5 hours':
			return Date.now() - 18000000;
		case 'last 12 hours':
			return Date.now() - 43200000;
		case 'last 24 hours':
			return Date.now() - 86400000;
		case 'last week':
			return Date.now() - 604800000;
		case 'last 30 days':
			return Date.now() - 2592000000;
		case '':
		default:
			return 0;
	}
}

function addZero(num) {
	return num.toString().length === 1 ? `0${num.toString()}` : num.toString();
}

export function preetifyDate(data) {
	return `${addZero(data.getDate())}.${addZero(data.getMonth() + 1)} 
			${addZero(data.getHours())}:${addZero(data.getMinutes())}`;
}
