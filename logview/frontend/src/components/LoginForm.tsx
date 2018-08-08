import * as React from 'react';
import { Submit } from '../styles/ButtonStyles';
import { Input } from '../styles/InputStyles';
import { Form } from '../styles/FormStyles';
import { Row } from '../styles/ContainerStyles';
import { TextLink } from '../styles/TextStyles';
import { Link } from 'react-router-dom';

interface ILoginFormProps {
	// someDefaultValue: string
}

interface ILoginFormState {
	username: string;
	email: string;
	password: string;
	remember: boolean;
}

interface SyntheticEvent<T> {
	currentTarget: EventTarget & T;
}

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
	constructor(props: any) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
			remember: false
		};
	}

	handleFieldChange = (e: React.FormEvent<HTMLInputElement>): void => {
		this.setState(state => ({
			...state,
			[e.currentTarget.name]: e.currentTarget.value
		}));
	};
	/*
	handleFieldChange = ({ target }) => {
		this.setState( state => ({
			...state,
			[target.name]: target.value
		}))
	}
	*/
	handleSubmit = () => {
		if (this.props.onSubmit) {
			this.props.onSubmit(this.state);
		}
	};

	handleCheckbox = ({ target }) => {
		this.setState({ remember: !this.state.remember });
	};

	render() {
		return (
			<Form>
				<h2>obServer</h2>
				<p>Welcome back, please login to your account</p>
				<Input
					type="text"
					name="username"
					placeholder="username"
					value={this.state.username}
					onChange={() => this.handleFieldChange()}
				/>
				<Input
					type="email"
					name="email"
					placeholder="email"
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
					<input
						type="checkbox"
						checked={this.state.remember}
						onClick={this.handleCheckbox}
					/>
					<span>Remember me</span>
				</Row>
				<Submit
					onClick={this.handleSubmit}
					type="submit"
					value="sign in"
				/>
				<div>
					Don't have an account yet?
					<TextLink>
						<Link to="register">sign up</Link>
					</TextLink>
				</div>
				<Link to="passwordreset">Forgot password?</Link>
			</Form>
		);
	}
}

export default LoginForm;
