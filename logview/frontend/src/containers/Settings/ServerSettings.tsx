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
import SettingServerForms from '../../components/settings/SettingServerForms';
import {
	fetchAppsList,
	addNewApp,
	updateApp,
	deleteApp
} from '../../redux/apps/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface ServerSettingsFormProps {
	apps: Array<AppsState>;
	actions: {
		fetchAppsList: Function;
		addNewApp: Function;
		updateApp: Function;
		deleteApp: Function;
	};
	fetchingAppsStatus: string;
}

class ServerSettings extends React.Component<
	ServerSettingsFormProps,
	Array<AppsState>
> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.actions.fetchAppsList();
	}

	render() {
		return this.props.fetchingAppsStatus === 'success' ? (
			<React.Fragment>
				<SettingServerForms
					apps={this.props.apps}
					actions={this.props.actions}
				/>
			</React.Fragment>
		) : (
			<LoaderOval />
		);
	}
}

const mapStateToProps = ({ fetchingAppsStatus, apps }) => ({
	fetchingAppsStatus,
	apps
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators(
		{ fetchAppsList, addNewApp, updateApp, deleteApp },
		dispatch
	)
});

const AppsSettingsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(ServerSettings);

export default AppsSettingsConnected;
