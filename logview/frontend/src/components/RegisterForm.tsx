import * as React from 'react';
import {
	Submit,
	Input,
	Form,
	ErrorText,
	Title,
	Redirect,
	RedirectRegister
} from 'src/containers/Register/RegisterStyles';
import { Link } from 'react-router-dom';
import { validateForm } from 'src/services/validate/validate';

interface RegFormState {
	name?: string;
	email?: string;
	password?: string;
	company?: string;
	validateState?: {
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
			validateState: {
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

		let validateState = validateForm(obj);
		this.setState({ validateState: validateState });
		let errors = [];
		for (let errorStatus in validateState) {
			errors.push(validateState[errorStatus]);
		}
		errors.indexOf(false) ? this.props.onSubmit(obj) : undefined;
	}

	render() {
		const { name, email, password, company } = this.state;
		return (
			<Form>
				<Title>Create obServer account</Title>
				<Redirect>
					or{' '}
					<RedirectRegister>
						<Link to="/login">sign in to your account</Link>
					</RedirectRegister>
				</Redirect>
				<Input
					autoComplete="off"
					type="text"
					name="name"
					value={name}
					placeholder="Name"
					onChange={this.handleFieldChange}
				/>
				{!this.state.validateState.name && (
					<ErrorText>Name can only contain letters</ErrorText>
				)}
				<Input
					type="email"
					name="email"
					value={email}
					placeholder="Email"
					onChange={this.handleFieldChange}
					autoComplete="off"
				/>
				{!this.state.validateState.email && (
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
				{!this.state.validateState.password && (
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
				{!this.state.validateState.company && (
					<ErrorText>
						Company should be at least 3 characters long
					</ErrorText>
				)}
				<Submit onClick={this.handleSubmit}>Create new account</Submit>
			</Form>
		);
	}
}

export default RegisterForm;
