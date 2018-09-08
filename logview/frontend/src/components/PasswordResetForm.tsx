import * as React from 'react';
import {
	Submit,
	Title,
	Input
} from 'src/containers/PasswordReset/PasswordResetStyles';
import { Link } from 'react-router-dom';

interface PasswordResetFormProps {
	onSubmit: Function;
}

interface PasswordResetFormState {
	email?: string;
}

class PasswordResetForm extends React.Component<
	PasswordResetFormProps,
	PasswordResetFormState
> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: ''
		};

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleFieldChange(e: any) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e: any) {
		e.preventDefault();
		this.props.onSubmit(this.state.email);
	}

	render() {
		return (
			<React.Fragment>
				<Title>Password reset</Title>
				Enter your email address and we will send you a link to reset
				your password.
				<Input
					type="email"
					name="email"
					placeholder="email"
					autoComplete="off"
					value={this.state.email}
					onChange={this.handleFieldChange}
				/>
				<br />
				<Submit onClick={this.handleSubmit}>
					Send password reset email
				</Submit>
			</React.Fragment>
		);
	}
}

export default PasswordResetForm;
