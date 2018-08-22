import * as React from 'react';
import SettingCheckBox from 'src/components/settings/SettingCheckBox';
import {
	SettingFormGroup,
	SettingFormGroupInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingsSubmitButton
} from 'src/styles/SettingsFormStyles';
import {
	Server,
	User,
	UserSecret,
	Bell,
	ProjectDiagram,
	Globe,
	CheckSquare
} from 'styled-icons/fa-solid';

import { SettingsState } from 'src/types/SettingsState';

import { changeSettings, fetchSettings } from 'src/redux/settings/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface SettingsFormProps {
	onSubmit: Function;
	actions: { changeSettings: Function; fetchSettings: Function };
	fetchingUserStatus: string;
}

class Settings extends React.Component<SettingsFormProps, SettingsState> {
	constructor(props) {
		super(props);
		this.state = {
			serverMemory: true,
			serverCPU: true,
			notificationServerIsDown: true,
			notificationHighRequest: true,
			appsMemory: true,
			appsCPU: true,
			appsErrorLog: true,
			appsHttp: true,
			appsSoket: true,
			listeningPorts: '543'
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	async handleSubmit(event) {
		event.preventDefault();
		console.log(this.state);
		await this.props.actions.changeSettings(this.state);

		console.log(await this.props.actions.fetchSettings());
	}

	render() {
		return (
			<React.Fragment>
				<form onSubmit={this.handleSubmit} id="settings-form">
					<SettingFormGroupLabel>
						<Bell size="18" style={{ marginRight: '10px' }} />
						Notification Settings
					</SettingFormGroupLabel>
					<SettingFormGroup>
						<SettingCheckBox
							name="notificationServerIsDown"
							label="Server is down"
							checked={this.state.notificationServerIsDown}
							onChange={this.handleChange}
						/>
						<SettingCheckBox
							name="notificationHighRequest"
							label="High Request Amount Increasing"
							checked={this.state.notificationHighRequest}
							onChange={this.handleChange}
						/>
					</SettingFormGroup>

					<SettingFormGroupLabel>
						<Server size="18" style={{ marginRight: '10px' }} />
						Your Server
					</SettingFormGroupLabel>
					<SettingFormGroup>
						<SettingCheckBox
							name="serverMemory"
							label="Server Memory Stats"
							checked={this.state.serverMemory}
							onChange={this.handleChange}
						/>
						<SettingCheckBox
							name="serverCPU"
							label="Server Cpu Stats"
							checked={this.state.serverCPU}
							onChange={this.handleChange}
						/>
					</SettingFormGroup>

					<SettingFormGroupLabel>
						<ProjectDiagram
							size="18"
							style={{ marginRight: '10px' }}
						/>
						Your Apps
					</SettingFormGroupLabel>
					<SettingFormGroup>
						<SettingCheckBox
							name="appsMemory"
							label="Apps Memory Stats"
							checked={this.state.appsMemory}
							onChange={this.handleChange}
						/>
						<SettingCheckBox
							name="appsCPU"
							label="Apps Usage Cpu Stats"
							checked={this.state.appsCPU}
							onChange={this.handleChange}
						/>
						<SettingCheckBox
							name="appsErrorLog"
							label="Apps Error Logs Stats"
							checked={this.state.appsErrorLog}
							onChange={this.handleChange}
						/>
						<SettingCheckBox
							name="appsHttp"
							label="Apps Http Stats"
							checked={this.state.appsHttp}
							onChange={this.handleChange}
						/>
						<SettingCheckBox
							name="appsSoket"
							label="Apps Soket Stats"
							checked={this.state.appsSoket}
							onChange={this.handleChange}
						/>
					</SettingFormGroup>

					<SettingFormGroupLabel>
						<Globe size="18" style={{ marginRight: '10px' }} />
						Ports
					</SettingFormGroupLabel>
					<SettingFormGroupInput>
						<SettingInput
							type="text"
							name="listeningPorts"
							value={this.state.listeningPorts}
							onChange={this.handleChange}
						/>
					</SettingFormGroupInput>

					<SettingsSubmitButton
						type="submit"
						form="settings-form"
						value="Submit"
					>
						<CheckSquare
							size="18"
							style={{ marginRight: '10px' }}
						/>
						Save All Change
					</SettingsSubmitButton>
				</form>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ fetchingUserStatus }) => ({
	fetchingUserStatus
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ changeSettings, fetchSettings }, dispatch)
});

const ProfileConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);

export default ProfileConnected;
