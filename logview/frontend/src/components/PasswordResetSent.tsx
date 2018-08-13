import * as React from 'react';

class PasswordReset extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div>Email sent!</div>
				<div>
					We've sent a message to *mail* so you can pick your new
					password.
				</div>
				<div>Not your email address?</div>
			</React.Fragment>
		);
	}
}

export default PasswordReset;
