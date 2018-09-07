import * as React from 'react';
import {
	SettingFormGroup,
	SettingFormGroupInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingsSubmitButton
} from '../../styles/SettingsFormStyles';
import {
	Server,
	Bell,
	ProjectDiagram,
	Globe,
	CheckSquare
} from 'styled-icons/fa-solid';
import { LoaderOval } from '../../components/loaders';
import SettingDataForm from '../../components/settings/SettingDataForm';
import { SettingsState } from '../../types/SettingsState';

import { changeSettings, fetchSettings } from '../../redux/settings/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface SettingsFormProps {
	settings: SettingsState;
	actions: { changeSettings: Function; fetchSettings: Function };
	fetchingSettingsStatus: string;
}

class DataSettings extends React.Component<SettingsFormProps, SettingsState> {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.actions.fetchSettings();
	}

	handleSubmit(state: SettingsState) {
		this.props.actions.changeSettings(
			state.serverMemory,
			state.serverCPU,
			state.notificationServerIsDown,
			state.notificationHighRequest,
			state.appsMemory,
			state.appsCPU,
			state.appsErrorLog,
			state.appsHttp,
			state.appsSoket,
			state.listeningPorts
		);
	}

	render() {
		return this.props.fetchingSettingsStatus === 'success' ? (
			<React.Fragment>
				<SettingDataForm
					settings={this.props.settings}
					onSubmit={this.handleSubmit}
				/>
			</React.Fragment>
		) : (
			<LoaderOval />
		);
	}
}

const mapStateToProps = ({ settings, fetchingSettingsStatus }) => ({
	settings,
	fetchingSettingsStatus
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ changeSettings, fetchSettings }, dispatch)
});

const DataSettingsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(DataSettings);

export default DataSettingsConnected;
