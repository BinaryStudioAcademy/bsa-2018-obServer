import * as React from 'react';
import { Title } from '../styles/Styles';

class PasswordReset extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Title>Email sent!</Title>
				<p>
					We've sent a message to your email so you can pick your new
					password.
				</p>
				<div>Not your email address?</div>
			</React.Fragment>
		);
	}
}

export default PasswordReset;
