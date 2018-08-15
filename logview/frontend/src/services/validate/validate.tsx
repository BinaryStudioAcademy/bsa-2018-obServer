export default function validate(str: string, type: string) {
	if (type === 'email') {
		var re = /^([a-zA-Z0-9\.])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return re.test(String(str).toLowerCase());
	} else if (type === 'password') {
	}
}
