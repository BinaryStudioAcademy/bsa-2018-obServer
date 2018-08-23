import * as React from 'react';
import {
	SettingFormGroup,
	SettingFormGroupInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingsSubmitButton
} from 'src/styles/SettingsFormStyles';

import { UserState } from 'src/types/UserState';
import SettingUserForm from 'src/components/settings/SettingUserForm';
import { userChange, fetchUser } from 'src/redux/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface SettingsUserFormProps {
	user: UserState;
	actions: { userChange: Function; fetchUser: Function };
	fetchingUserStatus: string;
}

class UserSettings extends React.Component<SettingsUserFormProps, UserState> {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(state: UserState) {
		await this.props.actions.userChange(
			state.name,
			state.email,
			state.password,
			state.company
		);
	}

	async componentDidMount() {
		await this.props.actions.fetchUser();
	}

	render() {
		return (
			this.props.fetchingUserStatus === 'success' && (
				<React.Fragment>
					<SettingUserForm
						user={this.props.user}
						onSubmit={this.handleSubmit}
					/>
				</React.Fragment>
			)
		);
	}
}

const mapStateToProps = ({ fetchingUserStatus, user }) => ({
	fetchingUserStatus,
	user
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userChange, fetchUser }, dispatch)
});

const UserSettingsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserSettings);

export default UserSettingsConnected;
