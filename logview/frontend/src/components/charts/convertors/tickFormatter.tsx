export function convertToHourMinute(timestamp) {
	const date = new Date(timestamp);
	return `${date.getHours()}:${date.getMinutes()}`;
}

export function convertToHourMinuteSecond(timestamp) {
	const date = new Date(timestamp);
	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function convertToDateTime(timestamp) {
	const date = new Date(timestamp);
	return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function convertDecimalToPercent(decimal, fixed = 0) {
	return `${(decimal * 100).toFixed(fixed)}`;
}

export function convertNumberToPercent(number, fixed = 0) {
	return `${number.toFixed(fixed)}%`;
}
