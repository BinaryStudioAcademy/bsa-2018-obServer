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
// import autobind from 'autobind-decorator';

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
	}

	handleFieldChange = (e: any) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = () => {
		this.props.onSubmit(this.state);
	};

	handleCheckbox() {
		this.setState({ remember: !this.state.remember });
	}

	render() {
		return (
			<Form>
				<h2>obServer</h2>
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
					{/* <CheckboxLabel> */}
					{/* <CheckboxSpan /> */}
					{/* </CheckboxLabel> */}
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
