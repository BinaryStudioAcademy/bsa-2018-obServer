export function parseAppsData(appsData) {
	let apps = [];

	appsData.forEach(app => {
		let obj = {};
		obj['id'] = app.id;
		obj['name'] = app.name;
		apps.push(obj);
	});

	return apps;
}

export function convertAppsDataToNames(appsData) {
	let apps = [];

	appsData.forEach(app => {
		apps.push(app.name);
	});

	return apps;
}
