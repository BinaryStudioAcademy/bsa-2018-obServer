import * as React from 'react';
import {
	SettingFormGroup,
	SettingFormGroupInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingsSubmitButton
} from 'src/styles/SettingsFormStyles';
import {
	Server,
	Bell,
	ProjectDiagram,
	Globe,
	CheckSquare
} from 'styled-icons/fa-solid';
import { LoaderOval } from 'src/components/loaders';
import { Title } from '../../styles/Styles';
import SettingDataForm from 'src/components/settings/SettingDataForm';
import { SettingsState } from 'src/types/SettingsState';

import { changeSettings, fetchSettings } from 'src/redux/settings/actions';
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

	async componentDidMount() {
		await this.props.actions.fetchSettings();
	}

	async handleSubmit(state: SettingsState) {
		await this.props.actions.changeSettings(
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
				<Title>Data Settings</Title>
				<div>&nbsp;</div>
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
