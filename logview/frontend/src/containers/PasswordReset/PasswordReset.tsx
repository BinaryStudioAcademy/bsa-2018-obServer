import * as React from 'react';
import PasswordResetForm from 'src/components/PasswordResetForm';
import PasswordResetSent from 'src/components/PasswordResetSent';
import { userResetPassword } from '../../redux/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PaperPlane } from 'styled-icons/fa-regular';
import { AnimatedComponent, Submit } from './PasswordResetStyles';
import { Landing } from '../../styles/ContainerStyles';
import { Link } from 'react-router-dom';
import { RedirectLink } from '../../styles/Styles';

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
			<Landing>
				<AnimatedComponent unmountOnExit in={true} timeout={1000}>
					{this.state.sent ? (
						<React.Fragment>
							<PasswordResetSent />
							<Submit onClick={this.handleSubmit}>
								Try again
								<PaperPlane size="20" />
							</Submit>
						</React.Fragment>
					) : (
						<PasswordResetForm onSubmit={this.handleSubmit} />
					)}
					Don't have an account yet?
					<RedirectLink>
						<Link to="/register">Sign up</Link>
					</RedirectLink>
				</AnimatedComponent>

			</Landing>
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
