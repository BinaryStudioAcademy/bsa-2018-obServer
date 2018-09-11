import moment from 'moment';

export function convertToDayHourMinute(timestamp) {
	return moment(timestamp).format('ddd HH:mm');
}

export function convertToHourMinuteSecond(timestamp) {
	return moment(timestamp).format('HH:mm');
}

export function convertToMinuteSecond(timestamp) {
	return moment(timestamp).format('mm:ss');
}

export function convertToDateTime(timestamp) {
	return moment(timestamp).format('MMM DD YYYY, h:mm:ss a');
}

export function convertToMonthDay(timestamp) {
	return moment(timestamp).format('ddd MMM DD');
}

export function convertDecimalToPercent(decimal, fixed = 0) {
	return `${(decimal * 100).toFixed(fixed)}`;
}

export function convertNumberToPercent(number, fixed = 0) {
	return `${number.toFixed(fixed)}%`;
}

export function convertXAxisTime(timeRange) {
	switch (timeRange) {
		case 'last 10 minutes':
		case 'last 30 minutes':
		case 'last hour':
		case 'last 5 hours':
		case 'last 12 hours':
			return convertToHourMinuteSecond;
		case 'last day':
		case 'last 24 hours':
			return convertToDayHourMinute;
		case 'last week':
		case 'last 30 days':
			return convertToMonthDay;
		case 'last  month':
			return convertToDayHourMinute;
		default:
			return convertToDayHourMinute;
	}
}
