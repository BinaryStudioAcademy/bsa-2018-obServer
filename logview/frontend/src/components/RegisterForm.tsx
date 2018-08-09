import * as React from 'react';
import { Submit } from '../styles/ButtonStyles';
import { Input } from '../styles/InputStyles';
import { Form } from '../styles/FormStyles';

interface RegFormState {
	name?: string;
	email?: string;
	password?: string;
	company?: string;
}
interface RegFormProps {
	onSubmit: Function;
}

class RegisterForm extends React.Component<RegFormProps, RegFormState> {
	constructor(props: any) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			company: ''
		};

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleFieldChange(e: any) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e: any) {
		e.preventDefault();
		this.props.onSubmit(this.state);
	}

	render() {
		const { name, email, password, company } = this.state;
		return (
			<Form>
				<h2>Register</h2>
				<Input
					name="name"
					value={name}
					placeholder="name"
					onChange={this.handleFieldChange}
				/>
				<Input
					name="email"
					value={email}
					placeholder="Email"
					onChange={this.handleFieldChange}
				/>
				<Input
					name="password"
					value={password}
					placeholder="Password"
					onChange={this.handleFieldChange}
				/>
				<Input
					name="company"
					value={company}
					placeholder="Company"
					onChange={this.handleFieldChange}
				/>
				<Submit onClick={this.handleSubmit}>sign up</Submit>
			</Form>
		);
	}
}

export default RegisterForm;
