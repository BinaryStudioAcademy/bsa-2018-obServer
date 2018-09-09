export function validate(type: string, str: string) {
	if (type === 'email') {
		let re = /^([a-zA-Z0-9\.])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return re.test(String(str).toLowerCase());
	} else if (type === 'password') {
		return str.length > 7;
	} else if (type === 'name') {
		let re = /^[a-zA-Z]+/;
		return re.test(String(str).toLowerCase());
	} else if (type === 'company') {
		return str.length > 2;
	}
}

export function validateForm(obj: {
	name: string;
	email: string;
	password: string;
	company: string;
}) {
	let res: {
		name: boolean;
		email: boolean;
		password: boolean;
		company: boolean;
	} = {
		name: false,
		email: false,
		password: false,
		company: false
	};
	for (let el in obj) {
		res[el] = validate(el, obj[el]);
	}
	return res;
}

export function validatePortsString(ports: string): boolean {
	const portsRegExp = /^[0-9]+(,[0-9]+)*$/;
	let testPorts: boolean;

	ports === '' || ports === null
		? (testPorts = true)
		: (testPorts = portsRegExp.test(ports));

	return testPorts;
}

export function validatePortNumber(port: string): boolean {
	const portRegExp = /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;
	let testPort: boolean;

	port === '' || port === null || port === undefined
		? (testPort = false)
		: (testPort = portRegExp.test(port));

	return testPort;
}

export function validateServeIp(ip: string): boolean {
	const ipAddressRegExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
	let testServerIp: boolean;

	ip === '' || ip === null || ip === undefined
		? (testServerIp = false)
		: (testServerIp = ipAddressRegExp.test(ip));

	return testServerIp;
}

export function validateAppName(appName: string): boolean {
	const appNameRegExp = /(.*[a-z]){3}/i;
	let testAppName: boolean;

	appName === '' || appName === null
		? (testAppName = false)
		: (testAppName = appNameRegExp.test(appName));

	return testAppName;
}

export function validateUsersNameData(name: string): boolean {
	const nameRegExp = /(.*[a-z]){3}/i;
	let testName: boolean;

	name === '' || name === null
		? (testName = false)
		: (testName = nameRegExp.test(name));

	return testName;
}
