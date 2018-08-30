import * as React from 'react';
import { Title } from '../../styles/Styles';
import { Landing } from '../../styles/ContainerStyles';

class EmailConfirm extends React.Component {
	render() {
		let user = JSON.parse(sessionStorage.getItem('user'));

		return (
			<Landing>
				<Title>Email sent!</Title>
				We've sent an email to <b>{user.email}</b> to confirm validity
				of your email address. After receiving the email, follow the
				link provided to complete the registration
			</Landing>
		);
	}
}

export default EmailConfirm;
