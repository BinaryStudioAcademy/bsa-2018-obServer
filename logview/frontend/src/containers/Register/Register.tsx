import * as React from 'react';
import RegisterForm from 'src/components/RegisterForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userRegister } from '../../redux/user/actions';
import { Wrapper } from 'src/styles/Styles';
import { Landing } from '../../styles/ContainerStyles';
const logo = require('src/assets/logo.png');

interface LoginFormProps {
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
		return (
			<Landing>
				<RegisterForm
					actions={{ userRegister: this.props.actions.userRegister }}
				/>
			</Landing>
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
