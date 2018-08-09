import * as React from 'react';
import {
	Submit,
	CheckboxInput,
	CheckboxLabel,
	CheckboxSpan
} from '../styles/ButtonStyles';
import { Input } from '../styles/InputStyles';
import { Form } from '../styles/FormStyles';
import { Row, RedirectContainer } from '../styles/ContainerStyles';
import { TextLink, ForgotPassword } from '../styles/TextStyles';
import { Link } from 'react-router-dom';

interface ILoginFormProps {
	onSubmit: Function;
}

interface ILoginFormState {
	username?: string;
	email?: string;
	password?: string;
	remember?: boolean;
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

	handleFieldChange = (e: any) => {
		let obj: Object = { [e.target.name]: e.target.value };
		this.setState(obj);
	};

	handleSubmit = () => {
		if (this.props.onSubmit) {
			this.props.onSubmit(this.state);
		}
	};

	handleCheckbox = () => {
		this.setState({ remember: !this.state.remember });
	};

	render() {
		return (
			<Form>
				<h2>obServer</h2>
				<p>Welcome back, please login to your account</p>
				<Input
					type="email"
					name="email"
					placeholder="email"
					value={this.state.email}
					onChange={e => this.handleFieldChange(e)}
				/>
				<Input
					type="password"
					name="password"
					placeholder="password"
					value={this.state.password}
					onChange={e => this.handleFieldChange(e)}
				/>
				<Row>
					<CheckboxInput
						type="checkbox"
						checked={this.state.remember}
						onClick={this.handleCheckbox}
					/>
					<CheckboxLabel htmlFor={this.refs.checkbox}>
						<CheckboxSpan />
					</CheckboxLabel>
					<span>Remember me</span>
				</Row>
				<Submit
					onClick={this.handleSubmit}
					type="submit"
					value="sign in"
				/>
				<ForgotPassword>
					<Link to="passwordreset">Forgot password?🦄</Link>
				</ForgotPassword>
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
