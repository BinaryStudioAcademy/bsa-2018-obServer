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
	RedirectRegister,
} from 'src/containers/Login/LoginStyles';
import { Link } from 'react-router-dom';

interface LoginFormProps {
	onSubmit: Function;
	status: string;
}

interface LoginFormState {
	email?: string;
	password?: string;
	remember?: boolean;
	err?: boolean;
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: '',
			password: '',
			remember: false,
			err: false
		};

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
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

	handleCheckbox() {
		this.setState({ remember: !this.state.remember });
	}

	render() {
		return (
			<Form>
				<Title>obServer</Title>
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
