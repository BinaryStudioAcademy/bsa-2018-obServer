import * as React from 'react';
import PasswordResetForm from 'src/components/PasswordResetForm';
import PasswordResetSent from 'src/components/PasswordResetSent';
import {
	Submit,
	PasswordResetContainer,
	PasswordWrapper,
	LinkButton,
	Row
} from 'src/styles/Styles';
import { userResetPassword } from '../../redux/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

interface LoginFormProps {
	actions: { userResetPassword: Function };
}

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

	handleSubmit(data) {
		this.setState({ sent: !this.state.sent });
		this.props.actions.userResetPassword(data);
	}

	render() {
		return (
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
					<Row>
						<LinkButton>
							<Link to="/login">sign in</Link>
						</LinkButton>
						<LinkButton>
							<Link to="/register">sign up</Link>
						</LinkButton>
					</Row>
				</PasswordWrapper>
			</PasswordResetContainer>
		);
	}
}

const mapStateToProps = ({ fetching }) => ({
	fetching
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userResetPassword }, dispatch)
});

const PasswordResetConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(PasswordReset);

export default PasswordResetConnected;
