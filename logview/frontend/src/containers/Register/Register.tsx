import * as React from 'react';
import RegisterForm from '../../components/RegisterForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userRegister } from '../../redux/user/actions';

interface ILoginFormProps {
	onSubmit: Function;
	actions: { userRegister: Function };
}

class Register extends React.Component<ILoginFormProps, {}> {
	handleSubmit = (data: any) => {
		this.props.actions.userRegister(data);
	};

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

export default connect(mapDispatchToProps)(Register);
