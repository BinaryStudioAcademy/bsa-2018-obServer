import * as React from 'react';
import { Form, Input, SignUp } from './RegistrationStyles';

interface IRegFormState {
	name?: string;
	email?: string;
	password?: string;
	company?: string;
}
interface IRegFormProps {
	onSubmit: Function;
}

class RegisterForm extends React.Component<IRegFormProps, IRegFormState> {
	constructor(props: any) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			company: ''
		};
	}

	handleFieldChange = (e: any) => {
		let obj: Object = { [e.target.name]: e.target.value };
		this.setState(obj);
	};

	handleSubmit = () => {
		if (this.props.onSubmit) {
			this.props.onSubmit(this.state);
		}
	};

	render() {
		const { name, email, password, company } = this.state;
		return (
			<React.Fragment>
				<Form>
					<h2>Register</h2>
					<Input
						name="name"
						value={this.state.name}
						placeholder="name"
						onChange={e => this.handleFieldChange(e)}
					/>
					<Input
						name="email"
						value={this.state.email}
						placeholder="Email"
						onChange={e => this.handleFieldChange(e)}
					/>
					<Input
						name="password"
						value={this.state.password}
						placeholder="Password"
						onChange={e => this.handleFieldChange(e)}
					/>
					<Input
						name="company"
						value={this.state.company}
						placeholder="Company"
						onChange={e => this.handleFieldChange(e)}
					/>
				</Form>
				<SignUp type="submit" value="sign up">
					Sign up
				</SignUp>
			</React.Fragment>
		);
	}
}

export default RegisterForm;
