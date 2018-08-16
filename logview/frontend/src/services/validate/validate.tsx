export function validate(type: string, str: string) {
	if (type === 'email') {
		var re = /^([a-zA-Z0-9\.])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return re.test(String(str).toLowerCase());
	} else if (type === 'password') {
		return str.length > 7;
	} else if (type === 'name') {
		var re = /^[a-zA-Z]+/;
		return str.length > 3 ? re.test(String(str).toLowerCase()) : false;
	} else if (type === 'company') {
		return str.length > 3;
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
	for (var el in obj) {
		console.log(el);
		res[el] = validate(el, obj[el]);
	}
	return res;
}
