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
