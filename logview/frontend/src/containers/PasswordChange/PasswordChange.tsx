import * as React from 'react';
import {
	Submit,
	Background,
	PasswordResetContainer,
	PasswordWrapper,
	Input
} from 'src/styles/Styles';
import { userChangePassword } from '../../redux/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface PasswordChangeProps {
	actions: { userChangePassword: Function };
}

interface PasswordChangeState {
	newpassword?: string;
	confirmpassword?: string;
}

class PasswordChange extends React.Component<
	PasswordChangeProps,
	PasswordChangeState
> {
	constructor(props: any) {
		super(props);

		this.state = {
			newpassword: '',
			confirmpassword: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	componentDidMount() {}

	handleSubmit() {
		let token = this.props.history.location.search.split('=')[1];
		this.state.newpassword === this.state.confirmpassword
			? this.props.actions.userChangePassword(
					this.state.newpassword,
					token
			  )
			: console.log("passwords doesn't match");
	}

	handleFieldChange(e: any) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (
			<PasswordResetContainer>
				<PasswordWrapper>
					<h2>Change password</h2>
					<Input
						name="newpassword"
						placeholder="new password"
						type="password"
						value={this.state.newpassword}
						onChange={this.handleFieldChange}
					/>
					<Input
						name="confirmpassword"
						placeholder="confirm password"
						type="password"
						value={this.state.confirmpassword}
						onChange={this.handleFieldChange}
					/>
					<Submit onClick={this.handleSubmit}>Change</Submit>
				</PasswordWrapper>
			</PasswordResetContainer>
		);
	}
}

const mapStateToProps = ({ fetching }) => ({
	fetching
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userChangePassword }, dispatch)
});

const PasswordChangeConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(PasswordChange);

export default PasswordChangeConnected;
/*

import * as React from 'react';
import PasswordResetForm from 'src/components/PasswordResetForm';
import PasswordResetSent from 'src/components/PasswordResetSent';
import {
	Submit,
	Background,
	PasswordResetContainer,
	PasswordWrapper
} from 'src/styles/Styles';
import { userResetPassword } from '../../redux/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface LoginFormProps {}

interface LoginFormState {
	sent: boolean;
}

class PasswordReset extends React.Component<LoginFormProps, LoginFormState> {
	constructor(props: any) {
		super(props);

		this.state = {
			sent: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		this.setState({ sent: !this.state.sent });
		this.props.actions.userResetPassword({})
	}

	render() {
		return (
			<Background>
				<PasswordResetContainer>
					<PasswordWrapper>
						{this.state.sent ? (
							<React.Fragment>
								<PasswordResetSent />
								<Submit onClick={this.handleSubmit}>
									Try again
								</Submit>
							</React.Fragment>
						) : (
							<PasswordResetForm onSubmit={this.handleSubmit} />
						)}
					</PasswordWrapper>
				</PasswordResetContainer>
			</Background>
		);
	}
}


*/
