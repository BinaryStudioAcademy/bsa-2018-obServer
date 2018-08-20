import * as React from 'react';
import LoginForm from 'src/components/LoginForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from 'src/redux/user/actions';
import {
	Wrapper,
	BackgroundContainer,
	Box,
	LogoContainer,
	LogoText,
	Logo
} from 'src/styles/Styles';
const logo = require('src/assets/logo.png');

interface LoginFormProps {
	onSubmit: Function;
	actions: { userLogin: Function };
	fetchingUserStatus: string;
}

class Login extends React.Component<LoginFormProps, {}> {
	constructor(props: any) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(data: any) {
		this.props.actions.userLogin(data.email, data.password);
		window.location.href = window.location.href;
	}

	render() {
		return (
			<Wrapper>
				<LoginForm
					onSubmit={this.handleSubmit}
					status={this.props.fetchingUserStatus}
				/>
				<BackgroundContainer>
					<Box>
						<LogoContainer>
							<Logo src={logo} />
							<LogoText>bServer</LogoText>
						</LogoContainer>
					</Box>
				</BackgroundContainer>
			</Wrapper>
		);
	}
}

const mapStateToProps = ({ fetchingUserStatus }) => ({
	fetchingUserStatus
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userLogin }, dispatch)
});

const LoginConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

export default LoginConnected;
