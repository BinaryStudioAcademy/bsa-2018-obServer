import * as React from 'react';
import LoginForm from 'src/components/LoginForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from 'src/redux/user/actions';
import { Wrapper } from 'src/styles/Styles';
import { Landing } from '../../styles/ContainerStyles';

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
	}

	render() {
		return (
			<Landing>
				<LoginForm
					onSubmit={this.handleSubmit}
					status={this.props.fetchingUserStatus}
				/>
			</Landing>
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
