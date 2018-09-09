export function parseAppsData(appsData) {
	let apps = [];

	appsData.forEach(app => {
		let obj = {};
		obj['id'] = app.id;
		obj['name'] = app.name;
		obj['port'] = app.port;
		apps.push(obj);
	});

	return apps;
}

export function convertAppsDataToSelect(appsData) {
	let apps = [];

	appsData.forEach(app => {
		apps.push({
			value: app.id,
			name: app.name
		});
	});

	return apps;
}
