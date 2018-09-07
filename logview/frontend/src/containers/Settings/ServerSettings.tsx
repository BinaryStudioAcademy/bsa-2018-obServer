import * as React from 'react';
import {
	SettingFormGroup,
	SettingFormGroupInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingsSubmitButton
} from '../../styles/SettingsFormStyles';
import { LoaderOval } from '../../components/loaders';
import { AppsState } from '../../types/AppsState';
import { ServerState } from '../../types/ServerState';
import SettingServerForms from '../../components/settings/SettingServerForms';
import {
	fetchAppsList,
	addNewApp,
	updateApp,
	deleteApp
} from '../../redux/apps/actions';

import {
	fetchServerSettings,
	changeServerSettings
} from '../../redux/server/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface ServerSettingsFormProps {
	apps: Array<AppsState>;
	server: ServerState;
	actions: {
		fetchAppsList: Function;
		addNewApp: Function;
		updateApp: Function;
		deleteApp: Function;
		fetchServerSettings: Function;
		changeServerSettings: Function;
	};
	fetchingAppsStatus: string;
	fetchingServerStatus: string;
}

interface ServerSettingsFormState {
	apps: Array<AppsState>;
	server: ServerState;
}

class ServerSettings extends React.Component<
	ServerSettingsFormProps,
	ServerSettingsFormState
> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.actions.fetchAppsList();
		this.props.actions.fetchServerSettings();
	}

	render() {
		const fetching =
			this.props.fetchingAppsStatus === 'success' &&
			this.props.fetchingServerStatus === 'success';
		return fetching ? (
			<React.Fragment>
				<SettingServerForms
					apps={this.props.apps}
					server={this.props.server}
					actions={this.props.actions}
				/>
			</React.Fragment>
		) : (
			<LoaderOval />
		);
	}
}

const mapStateToProps = ({
	fetchingAppsStatus,
	fetchingServerStatus,
	apps,
	server
}) => ({
	fetchingAppsStatus,
	fetchingServerStatus,
	apps,
	server
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators(
		{
			fetchAppsList,
			addNewApp,
			updateApp,
			deleteApp,
			fetchServerSettings,
			changeServerSettings
		},
		dispatch
	)
});

const AppsSettingsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(ServerSettings);

export default AppsSettingsConnected;
