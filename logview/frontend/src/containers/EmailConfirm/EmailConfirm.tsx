import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	Background,
	PasswordResetContainer,
	PasswordWrapper
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
					<PasswordWrapper>
						We've sent an email to *here will be email* to confirm
						validity of your email address. After receiving the
						email, follow the link provided to complete the
						registration
					</PasswordWrapper>
				</PasswordResetContainer>
			</Background>
		);
	}
}

export default EmailConfirm;
