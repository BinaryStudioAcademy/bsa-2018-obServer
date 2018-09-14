import * as React from 'react';
import {
	Submit,
	Input,
	Form,
	Row,
	RedirectLink,
	Title,
	ErrorText,
	Redirect,
	RedirectRegister
} from '../containers/Login/LoginStyles';
import { Link } from 'react-router-dom';
import { Binoculars } from 'styled-icons/fa-solid';

interface LoginFormProps {
	onSubmit: Function;
	status: string;
}

interface LoginFormState {
	email?: string;
	password?: string;
	err?: boolean;
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: '',
			password: '',
			err: false
		};

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleFieldChange(e: any) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e: any) {
		e.preventDefault();

		let obj: Object = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.onSubmit(obj);
	}

	render() {
		return (
			<Form>
				<Title>
					<Link to="/">
						<Binoculars size="25" /> obServer
					</Link>
				</Title>
				<Row>
					<div>Sign in</div>
					<Redirect>
						or{' '}
						<RedirectRegister>
							<Link to="register">create an account</Link>
						</RedirectRegister>
					</Redirect>
				</Row>
				<Input
					type="email"
					name="email"
					placeholder="email"
					autoComplete="off"
					value={this.state.email}
					onChange={this.handleFieldChange}
				/>
				<Input
					type="password"
					name="password"
					placeholder="password"
					value={this.state.password}
					onChange={this.handleFieldChange}
				/>
				{this.props.status === 'failed' && (
					<ErrorText>Email or password is incorrect</ErrorText>
				)}
				<Row>
					<RedirectLink>
						<Link to="reset">Forgot password?🦄</Link>
					</RedirectLink>
					<Submit onClick={this.handleSubmit}>sign in</Submit>
				</Row>
			</Form>
		);
	}
}

export default LoginForm;
