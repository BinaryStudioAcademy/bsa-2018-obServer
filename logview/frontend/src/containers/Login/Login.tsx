import * as React from 'react';
import LoginForm from '../../components/LoginForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from '../../redux/user/actions';
import { Layout } from '../../styles/ContainerStyles';

class Login extends React.Component {
	handleSubmit = data => {
		this.props.actions.userLogin(data);
	};

	render() {
		return (
			<React.Fragment>
				<LoginForm onSubmit={this.handleSubmit} />
			</React.Fragment>
		);
	}
}

// const mapStateToProps = state => ({

// });

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ userLogin }, dispatch)
});

export default connect(mapDispatchToProps)(Login);
