import * as React from 'react';
import LoginForm from '../../components/LoginForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from 'src/redux/user/actions';
import {
	Wrapper,
	BackgroundContainer,
	Box,
	LogoContainer
} from '../../styles/ContainerStyles';
import { LogoText } from '../../styles/TextStyles';
import { Logo } from '../../styles/ImageStyles';
const logo = require('src/assets/logo.png');

interface ILoginFormProps {
	onSubmit: Function;
	actions: { userLogin: Function };
}

class Login extends React.Component<ILoginFormProps, {}> {
	constructor(props: any) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(data: any) {
		this.props.actions.userLogin(data.email, data.password);
	}

	render() {
		return (
			<Wrapper>
				<LoginForm onSubmit={this.handleSubmit} />
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

// const mapStateToProps = (state: any) => ({

// });

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userLogin }, dispatch)
});

const LoginConnected = connect(
	null,
	mapDispatchToProps
)(Login);

export default LoginConnected;
