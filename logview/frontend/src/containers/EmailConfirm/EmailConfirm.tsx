import * as React from 'react';
import {
	Background,
	PasswordResetContainer,
	CenteredText,
	Title,
	EmailContainer
} from '../../styles/Styles';

class EmailConfirm extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {}

	render() {
		let user = sessionStorage.getItem('user');

		return (
			<Background>
				<PasswordResetContainer>
					<EmailContainer>
						<Title>Email sent!</Title>
						<CenteredText>
							We've sent an email to <b>{user}</b> to
							confirm validity of your email address. After
							receiving the email, follow the link provided to
							complete the registration
						</CenteredText>
					</EmailContainer>
				</PasswordResetContainer>
			</Background>
		);
	}
}

export default EmailConfirm;
