import * as React from 'react';
import PasswordResetForm from 'src/components/PasswordResetForm';
import PasswordResetSent from 'src/components/PasswordResetSent';
import {
	Submit,
	Background,
	PasswordResetContainer,
	PasswordWrapper
} from 'src/styles/Styles';

interface LoginFormProps {}

interface LoginFormState {
	sent: boolean;
}

class PasswordReset extends React.Component<LoginFormProps, LoginFormState> {
	constructor(props: any) {
		super(props);

		this.state = {
			sent: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		this.setState({ sent: !this.state.sent });
	}

	render() {
		return (
			<Background>
				<PasswordResetContainer>
					<PasswordWrapper>
						{this.state.sent ? (
							<React.Fragment>
								<PasswordResetSent />
								<Submit onClick={this.handleSubmit}>
									Try again
								</Submit>
							</React.Fragment>
						) : (
							<PasswordResetForm onSubmit={this.handleSubmit} />
						)}
					</PasswordWrapper>
				</PasswordResetContainer>
			</Background>
		);
	}
}

export default PasswordReset;
