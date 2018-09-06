import * as React from 'react';
import {
	SettingFormGroup,
	SettingFormGroupInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingsSubmitButton
} from 'src/styles/SettingsFormStyles';
import { LoaderOval } from 'src/components/loaders';
import { AppsState } from 'src/types/AppsState';
import SettingAppsForm from 'src/components/settings/SettingsAppsForm';
import { fetchAppsList, addNewApp, deleteApp } from 'src/redux/apps/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface SettingsAppsFormProps {
	apps: Array<AppsState>;
	actions: {
		fetchAppsList: Function;
		addNewApp: Function;
		deleteApp: Function;
	};
	fetchingAppsStatus: string;
}

class AppsSettings extends React.Component<
	SettingsAppsFormProps,
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
				<SettingAppsForm
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
		{ fetchAppsList, addNewApp, deleteApp },
		dispatch
	)
});

const AppsSettingsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppsSettings);

export default AppsSettingsConnected;
