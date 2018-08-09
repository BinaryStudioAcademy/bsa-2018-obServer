import * as React from 'react';
import LoginForm from '../../components/LoginForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from '../../redux/user/actions';
import {
	Wrapper,
	BackgroundContainer,
	Box
} from '../../styles/ContainerStyles';
import { LoginBackground } from '../../styles/ImageStyles';
import { LogoText } from '../../styles/TextStyles';

interface ILoginFormProps {
	onSubmit: Function;
	actions: { userLogin: Function };
}

class Login extends React.Component<ILoginFormProps, {}> {
	handleSubmit = (data: any) => {
		this.props.actions.userLogin(data);
	};

	render() {
		return (
			<Wrapper>
				<LoginForm onSubmit={this.handleSubmit} />
				<BackgroundContainer>
					<Box>
						<LogoText>obServer</LogoText>
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

export default connect(mapDispatchToProps)(Login);
