import * as React from 'react';
import RegisterForm from '../../components/RegisterForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userRegister } from '../../redux/user/actions';
import { fetchingState } from '../../redux/user/reducer';
import {
	RegisterContainer,
	RegisterBox,
	Wrapper,
	LogoContainer
} from '../../styles/ContainerStyles';
import { LogoText } from '../../styles/TextStyles';
import { Logo } from '../../styles/ImageStyles';
const logo = require('src/assets/logo.png');

interface LoginFormProps {
	onSubmit: Function;
	actions: { userRegister: Function };
}

interface LoginFormState {}

class Register extends React.Component<LoginFormProps, LoginFormState> {
	constructor(props: any) {
		super(props);

		this.state = {
			fetching: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(data: any) {
		this.props.actions.userRegister(
			data.name,
			data.email,
			data.password,
			data.company
		);
	}

	render() {
		console.log(this.props);
		return (
			<Wrapper>
				<RegisterContainer>
					<RegisterBox>
						<LogoContainer>
							<Logo src={logo} />
							<LogoText>bServer</LogoText>
						</LogoContainer>
					</RegisterBox>
				</RegisterContainer>
				<RegisterForm onSubmit={this.handleSubmit} />
			</Wrapper>
		);
	}
}

const mapStateToProps = ({ fetching }) => ({
	fetching
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userRegister }, dispatch)
});

const RegisterConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);

export default RegisterConnected;
