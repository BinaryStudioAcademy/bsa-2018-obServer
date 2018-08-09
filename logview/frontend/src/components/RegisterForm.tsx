import * as React from 'react';
import { Submit } from 'src/styles/ButtonStyles';
import { Input } from 'src/styles/InputStyles';
import { Form } from 'src/styles/FormStyles';
import autobind from 'autobind-decorator';

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
	}

	@autobind
	handleFieldChange(e: any) {
		this.setState({ [e.target.name]: e.target.value });
	}

	@autobind
	handleSubmit() {
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
				<Submit type="submit" value="sign up" />
			</Form>
		);
	}
}

export default RegisterForm;
