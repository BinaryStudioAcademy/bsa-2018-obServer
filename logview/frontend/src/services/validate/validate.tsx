export function validate(type: string, str: string) {
	if (type === 'email') {
		let re = /^([a-zA-Z0-9\.])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return re.test(String(str).toLowerCase());
	} else if (type === 'password') {
		return str.length > 7;
	} else if (type === 'name') {
		let re = /^[a-zA-Z ]{2,30}$/;
		return re.test(String(str));
	} else if (type === 'company') {
		let re = /[!@#$%^&*]/;
		return !re.test(String(str)) && str.length > 2;
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
