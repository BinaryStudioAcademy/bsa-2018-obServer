/**
 * Returns errStats regarding provided period
 * @param logs
 * @param timespan
 */
export function calculateErrStats(logs, timespan) {
	let startDateValue = defineStartDateValue(timespan);
	const errorLogs = logs.filter(log => {
		return log.level === 0 && log.timestamp >= startDateValue;
	});

	if (errorLogs.length === 0) {
		return [{ timestamp: Date.now(), errors: 0 }];
	}

	switch (timespan) {
		case 'last 10 minutes':
			// 10 chart bars
			return calculateErrStatsByTime(
				errorLogs,
				startDateValue,
				60000,
				10
			);
		case 'last 30 minutes':
			// 30 chart bars
			return calculateErrStatsByTime(
				errorLogs,
				startDateValue,
				60000,
				30
			);
		case 'last hour':
			// 12 chart bars
			return calculateErrStatsByTime(
				errorLogs,
				startDateValue,
				300000,
				12
			);
		case 'last 5 hours':
			// 20 chart bars
			return calculateErrStatsByTime(
				errorLogs,
				startDateValue,
				900000,
				20
			);
		case 'last 12 hours':
			// 12 chart bars
			return calculateErrStatsByTime(
				errorLogs,
				startDateValue,
				3600000,
				12
			);
		case 'last 24 hours':
			// 24 chart bars
			return calculateErrStatsByTime(
				errorLogs,
				startDateValue,
				3600000,
				24
			);
		case 'last week':
			// 8 chart bars
			return calculateErrStatsByDate(
				errorLogs,
				startDateValue,
				86400000,
				8
			);
		case 'last 30 days':
			// 30 chart bars
			return calculateErrStatsByDate(
				errorLogs,
				startDateValue,
				86400000,
				31
			);
		default:
			return [{ timestamp: Date.now(), errors: 0 }];
	}
}

function calculateErrStatsByDate(
	errorLogs,
	startDateValue,
	stepValue,
	stepsNumber
) {
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

function calculateErrStatsByTime(
	errorLogs,
	startDateValue,
	stepValue,
	stepsNumber
) {
	let res = [];
	let startDateStamp = startDateValue;
	let endDateStamp = startDateStamp + stepValue;

	for (let i = 0; i < stepsNumber; i++) {
		let item = { timestamp: 0, errors: 0 };
		item.timestamp = endDateStamp;
		item.errors = errorLogs.filter(log => {
			return (
				log.timestamp >= startDateStamp && log.timestamp < endDateStamp
			);
		}).length;
		res.push(item);
		startDateStamp = endDateStamp;
		endDateStamp += stepValue;
	}
	return res;
}

export function filterLogs(logs, filters) {
	// sorting by log level

	// might be not needed (depending on format of log.level value)
	const levels = {
		0: 'error',
		1: 'warn',
		2: 'info',
		3: 'verbose',
		4: 'debug',
		5: 'silly'
	};

	let filteredByLevel = logs.filter(log => {
		return filters.levels[levels[log.level]] === true;
	});

	// sorting by date
	let filteredByDate = [];
	let startDateValue = defineStartDateValue(filters.timespan);
	filteredByLevel.length > 0
		? (filteredByDate = filteredByLevel.filter(log => {
				return log.timestamp >= startDateValue;
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