import * as React from 'react';
import { Title, Wrapper } from '../../styles/Styles';

class EmailConfirm extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {}

	render() {
		let user = JSON.parse(sessionStorage.getItem('user'));

		return (
			<Wrapper>
				<Title>Email sent!</Title>
				We've sent an email to <b>{user.email}</b> to confirm validity
				of your email address. After receiving the email, follow the
				link provided to complete the registration
			</Wrapper>
		);
	}
}

export default EmailConfirm;
