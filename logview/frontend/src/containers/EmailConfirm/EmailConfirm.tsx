import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	Background,
	PasswordResetContainer,
	PasswordWrapper,
	CenteredText,
	Title,
	EmailContainer
} from '../../styles/Styles';
const sendIcon = require('src/assets/confirm-icon.png');

class EmailConfirm extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<Background>
				<PasswordResetContainer>
					<EmailContainer>
						<Title>Email sent!</Title>
						<CenteredText>
							We've sent an email to *here will be email* to
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
