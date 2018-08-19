import * as React from 'react';
import { Input, Submit } from '../../styles/Styles';
import { userInvite } from 'src/redux/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

interface LoginFormProps {
	actions: { userInvite: Function };
}

interface ProfileState {
	email?: string;
	name?: string;
	err?: boolean;
}

class Profile extends React.Component<LoginFormProps, ProfileState> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: '',
			name: '',
			err: false
		};

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleFieldChange(e: any) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e: any) {
		e.preventDefault();

		this.props.actions.userInvite(this.state.email, this.state.name);
		// this.setState({ err: true });
	}

	render() {
		return (
			<React.Fragment>
				<h2>Invite user</h2>
				<Input placeholder="email" onChange={this.handleFieldChange} />
				<Input placeholder="name" onChange={this.handleFieldChange} />
				<Submit onClick={this.handleSubmit}>Invite</Submit>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userInvite }, dispatch)
});

const ProfileConnected = connect(
	null,
	mapDispatchToProps
)(Profile);

export default ProfileConnected;
