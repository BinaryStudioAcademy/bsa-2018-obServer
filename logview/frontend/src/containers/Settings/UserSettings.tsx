import * as React from 'react';
import {
	SettingFormGroup,
	SettingFormGroupInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingsSubmitButton
} from '../../styles/SettingsFormStyles';
import { LoaderOval } from '../../components/loaders';
import { UserState } from '../../types/UserState';
import SettingUserForm from '../../components/settings/SettingUserForm';
import { userChange, fetchUser } from '../../redux/user/actions';
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

	handleSubmit(state: UserState) {
		this.props.actions.userChange(
			state.name,
			state.email,
			state.company,
			state.companyId
		);
	}

	componentDidMount() {
		this.props.actions.fetchUser();
	}

	render() {
		return this.props.fetchingUserStatus === 'success' ? (
			<SettingUserForm
				user={this.props.user}
				onSubmit={this.handleSubmit}
			/>
		) : (
			<LoaderOval />
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
