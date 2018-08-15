import * as React from 'react';

class PasswordReset extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h2>Email sent!</h2>
				<p>
					We've sent a message to *mail* so you can pick your new
					password.
				</p>
				<div>Not your email address?</div>
			</React.Fragment>
		);
	}
}

export default PasswordReset;
