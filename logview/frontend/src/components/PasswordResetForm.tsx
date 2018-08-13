import * as React from 'react';
import { Submit, CheckboxInput } from '../styles/ButtonStyles';
import { Input } from '../styles/InputStyles';
import { Form } from '../styles/FormStyles';
import { Row, RedirectContainer } from '../styles/ContainerStyles';
import { TextLink, RedirectLink } from '../styles/TextStyles';
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
		this.props.onSubmit();
	}

	render() {
		return (
			<Form>
				<h2>Password reset</h2>
				<p />
				<Input
					type="email"
					name="email"
					placeholder="email"
					autoComplete="off"
					value={this.state.email}
					onChange={this.handleFieldChange}
				/>
				<Submit onClick={this.handleSubmit}>send</Submit>
			</Form>
		);
	}
}

export default PasswordResetForm;
