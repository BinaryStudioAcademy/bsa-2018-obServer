import * as React from 'react';
import {
	Submit,
	Input,
	Form,
	RedirectLink,
	ErrorText
} from 'src/styles/Styles';
import { Link } from 'react-router-dom';
import { validateForm } from 'src/services/validate/validate';

interface RegFormState {
	name?: string;
	email?: string;
	password?: string;
	company?: string;
	validatestate?: {
		name: boolean;
		email: boolean;
		password: boolean;
		company: boolean;
	};
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
			company: '',
			validatestate: {
				name: true,
				email: true,
				password: true,
				company: true
			}
		};

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleFieldChange(e: any) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e: any) {
		e.preventDefault();
		let obj = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			company: this.state.company
		};

		let validatestate = validateForm(obj);
		this.setState({ validatestate: validatestate });
		Object.values(validatestate).includes(false)
			? undefined
			: this.props.onSubmit(obj);
	}

	render() {
		const { name, email, password, company } = this.state;
		return (
			<Form>
				<h2>Welcome to obServer</h2>
				<p>Web-service dedicated to monitor your server in real-time</p>
				<Input
					autoComplete="off"
					type="text"
					name="name"
					value={name}
					placeholder="Name"
					onChange={this.handleFieldChange}
				/>
				{this.state.validatestate.name ? (
					undefined
				) : (
					<ErrorText>
						Name should be at least 3 characters long and can only
						contain letters
					</ErrorText>
				)}
				<Input
					type="email"
					name="email"
					value={email}
					placeholder="Email"
					onChange={this.handleFieldChange}
					autoComplete="off"
				/>
				{this.state.validatestate.email ? (
					undefined
				) : (
					<ErrorText>
						Email is not valid, ex. "email@domain.name"
					</ErrorText>
				)}
				<Input
					type="password"
					name="password"
					value={password}
					placeholder="Password"
					onChange={this.handleFieldChange}
					autoComplete="off"
				/>
				{this.state.validatestate.password ? (
					undefined
				) : (
					<ErrorText>
						Password should be at least 8 characters long
					</ErrorText>
				)}
				<Input
					type="company"
					name="company"
					value={company}
					placeholder="Company"
					onChange={this.handleFieldChange}
					autoComplete="off"
				/>
				{this.state.validatestate.company ? (
					undefined
				) : (
					<ErrorText>
						Company should be at least 3 characters long
					</ErrorText>
				)}
				<Submit onClick={this.handleSubmit}>sign up</Submit>

				<RedirectLink>
					<Link to="login"> Back to login </Link>
				</RedirectLink>
			</Form>
		);
	}
}

export default RegisterForm;
