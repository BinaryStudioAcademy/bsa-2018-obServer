import * as React from 'react';

const LoginForm = () => (
	<form>
		<input type="text" placeholder="username" />
		<input type="text" placeholder="password" />
		<input type="text" placeholder="email" />
		<input type="checkbox" />
		<span>Remember me</span>
		<input type="submit" value="sign in" />
	</form>
);

export default LoginForm;
