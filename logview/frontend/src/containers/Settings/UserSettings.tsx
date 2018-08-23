import * as React from 'react';
import {
	SettingFormGroup,
	SettingFormGroupInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingsSubmitButton
} from 'src/styles/SettingsFormStyles';
import { User, UserSecret, CheckSquare } from 'styled-icons/fa-solid';

import { UserState } from 'src/types/UserState';
import SettingUserForm from 'src/components/settings/SettingUserForm';
import { userRegister } from 'src/redux/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface SettingsUserFormProps {
	user: UserState;
	actions: { userRegister: Function };
	fetchingUserStatus: string;
}

class UserSettings extends React.Component<SettingsUserFormProps, UserState> {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit() {
		await this.props.actions.userRegister(this.state);
	}

	render() {
		return (
			<React.Fragment>
				<SettingUserForm
					user={this.props.user}
					onSubmit={this.handleSubmit}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ fetchingUserStatus, user }) => ({
	fetchingUserStatus,
	user
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userRegister }, dispatch)
});

const UserSettingsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserSettings);

export default UserSettingsConnected;
