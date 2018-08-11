import * as React from 'react';
import PasswordResetForm from 'src/components/PasswordResetForm';
import PasswordResetSent from 'src/components/PasswordResetSent';

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
			<React.Fragment>
				{this.state.sent ? (
					<PasswordResetSent />
				) : (
					<PasswordResetForm onSubmit={this.handleSubmit} />
				)}
			</React.Fragment>
		);
	}
}

export default PasswordReset;
