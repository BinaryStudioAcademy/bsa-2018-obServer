import * as React from 'react';
import { Submit } from '../styles/ButtonStyles';
import { Input } from '../styles/InputStyles';
import { Form } from '../styles/FormStyles';
import { RedirectLink } from '../styles/TextStyles';
import { Link } from 'react-router-dom';

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
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleFieldChange(e: any) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e: any) {
		e.preventDefault();
		this.props.onSubmit(this.state);
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
				<Input
					type="email"
					name="email"
					value={email}
					placeholder="Email"
					onChange={this.handleFieldChange}
					autoComplete="off"
				/>
				<Input
					type="password"
					name="password"
					value={password}
					placeholder="Password"
					onChange={this.handleFieldChange}
					autoComplete="off"
				/>
				<Input
					type="company"
					name="company"
					value={company}
					placeholder="Company"
					onChange={this.handleFieldChange}
					autoComplete="off"
				/>
				<Submit onClick={this.handleSubmit}>sign up</Submit>

				<RedirectLink>
					<Link to="login"> Back to login </Link>
				</RedirectLink>
			</Form>
		);
	}
}

export default RegisterForm;
