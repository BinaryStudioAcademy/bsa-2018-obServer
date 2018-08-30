import * as React from 'react';
import {
	Title,
} from '../../styles/Styles';
import { LandingColumn } from '../../styles/ContainerStyles';

class EmailConfirm extends React.Component {
	render() {
		let user = JSON.parse(sessionStorage.getItem('user'));

		return (
			<LandingColumn>
				<Title>Email sent!</Title>
				We've sent an email to <b>{user.email}</b> to confirm validity
				of your email address. After receiving the email, follow the
				link provided to complete the registration
			</LandingColumn>
		);
	}
}

export default EmailConfirm;
