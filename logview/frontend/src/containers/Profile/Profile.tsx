import * as React from 'react';
import { Input, Submit, ErrorText } from '../../styles/Styles';
import { userInvite } from 'src/redux/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

interface LoginFormProps {
	actions: { userInvite: Function };
	fetchingUserStatus: string;
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
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleFieldChange(e: any) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e: any) {
		e.preventDefault();

		this.props.actions.userInvite(this.state.email, this.state.name);
	}

	handleLogout() {}

	render() {
		return (
			<React.Fragment>
				<h2>Invite user</h2>
				<Input
					name="email"
					placeholder="email"
					onChange={this.handleFieldChange}
				/>
				<Input
					name="name"
					placeholder="name"
					onChange={this.handleFieldChange}
				/>
				<Submit onClick={this.handleSubmit}>
					{this.props.fetchingUserStatus === 'sucess'
						? 'Sent'
						: 'Invite'}
				</Submit>
				<ErrorText>
					{this.props.fetchingUserStatus === 'failed'
						? 'There was an error processing your request'
						: ''}
				</ErrorText>
				<Submit onClick={this.handleLogout}>Logout</Submit>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ fetchingUserStatus }) => ({
	fetchingUserStatus
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userInvite }, dispatch)
});

const ProfileConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);

export default ProfileConnected;