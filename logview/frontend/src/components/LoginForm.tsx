import * as React from 'react';
import {
	Submit,
	CheckboxInput,
	Input,
	Form,
	Row,
	RedirectContainer,
	TextLink,
	RedirectLink,
	Title
} from '../styles/Styles';
import { Link } from 'react-router-dom';

interface LoginFormProps {
	onSubmit: Function;
}

interface LoginFormState {
	email?: string;
	password?: string;
	remember?: boolean;
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: '',
			password: '',
			remember: false
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
				<p>Welcome back, please login to your account</p>
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
				<Row>
					<CheckboxInput
						type="checkbox"
						checked={this.state.remember}
						onClick={this.handleCheckbox}
					/>
					<span>Remember me</span>
				</Row>
				<Submit onClick={this.handleSubmit}>sign in</Submit>
				<RedirectLink>
					<Link to="reset">Forgot password?🦄</Link>
				</RedirectLink>
				<RedirectContainer>
					<p>Don't have an account yet?</p>
					<TextLink>
						<Link to="register">sign up</Link>
					</TextLink>
				</RedirectContainer>
			</Form>
		);
	}
}

export default LoginForm;
