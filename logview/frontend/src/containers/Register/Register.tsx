import * as React from 'react';
import RegisterForm from '../../components/RegisterForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userRegister } from '../../redux/user/actions';
import autobind from 'autobind-decorator';

interface ILoginFormProps {
	onSubmit: Function;
	actions: { userRegister: Function };
}

class Register extends React.Component<ILoginFormProps, {}> {
	@autobind
	handleSubmit(data: any) {
		this.props.actions.userRegister(data);
	}

	render() {
		return (
			<React.Fragment>
				<RegisterForm onSubmit={this.handleSubmit} />
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userRegister }, dispatch)
});

const RegisterConnected = connect(mapDispatchToProps)(Register);

export default RegisterConnected;
