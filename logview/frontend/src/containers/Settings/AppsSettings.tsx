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
import { fetchAppsList, addNewApp } from 'src/redux/apps/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface SettingsAppsFormProps {
	apps: Array<AppsState>;
	actions: { fetchAppsList: Function; addNewApp: Function };
	fetchingAppsStatus: string;
}

class AppsSettings extends React.Component<
	SettingsAppsFormProps,
	Array<AppsState>
> {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(state: Array<AppsState>) {
		this.props.actions.addNewApp();
	}

	componentDidMount() {
		this.props.actions.fetchAppsList();
	}

	render() {
		return this.props.fetchingAppsStatus === 'success' ? (
			<React.Fragment>
				<SettingAppsForm
					apps={this.props.apps}
					onSubmit={this.handleSubmit}
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
	actions: bindActionCreators({ fetchAppsList, addNewApp }, dispatch)
});

const AppsSettingsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppsSettings);

export default AppsSettingsConnected;
