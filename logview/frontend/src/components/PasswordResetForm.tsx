import * as React from 'react';
import { Submit, InputWide, Title } from 'src/styles/Styles';
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
				<InputWide
					type="email"
					name="email"
					placeholder="email"
					autoComplete="off"
					value={this.state.email}
					onChange={this.handleFieldChange}
				/>
				<Submit onClick={this.handleSubmit}>send</Submit>
			</React.Fragment>
		);
	}
}

export default PasswordResetForm;
