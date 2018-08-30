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

export function convertDecimalToPercent(decimal, fixed = 0) {
	return `${(decimal * 100).toFixed(fixed)}`;
}

export function convertNumberToPercent(number, fixed = 0) {
	return `${number.toFixed(fixed)}%`;
}

export function convertXAxisTime(timeRange) {
	switch (timeRange) {
		case 'last 10 minutes':
			return convertToMinuteSecond;
		case 'last 30 minutes':
			return convertToMinuteSecond;
		case 'last 1 hour':
			return convertToHourMinuteSecond;
		case 'last 5 hours':
			return convertToHourMinuteSecond;
		case 'last 12 hours':
			return convertToHourMinuteSecond;
		case 'last day':
			return convertToDayHourMinute;
		case 'last week':
			return convertToDayHourMinute;
		case 'last  month':
			return convertToDayHourMinute;
		default:
			return convertToDayHourMinute;
	}
}
