import * as React from 'react';
import RegistrationForm from '../../components/RegistrationForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { userRegister } from '../../redux/user/actions';
import { Wrapper } from '../../components/RegistrationStyles';

class Registration extends React.Component {
	handleSubmit = data: any => {
		this.props.actions.userRegister(data);
	};
	render() {
		return (
			<React.Fragment>
				<RegistrationForm onSubmit={this.handleSubmit} />
			</React.Fragment>
		);
	}
}

/* const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ userRegister }, dispatch)
}); */

export default connect(mapDispatchToProps)(Registration);
