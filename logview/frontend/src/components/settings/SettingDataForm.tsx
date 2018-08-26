import * as React from 'react';
import SettingCheckBox from 'src/components/settings/SettingCheckBox';
import { SettingsState } from 'src/types/SettingsState';
import { validatePortsString } from 'src/services/validate/validate';
import {
	SettingFormGroup,
	SettingFormGroupOneInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingsSubmitButton,
	ErrorInputSettings
} from 'src/styles/SettingsFormStyles';
import {
	Server,
	Bell,
	ProjectDiagram,
	Globe,
	CheckSquare
} from 'styled-icons/fa-solid';

interface SettingsFormProps {
	settings: SettingsState;
	onSubmit: Function;
}

interface SettingsDataState {
	serverMemory?: boolean;
	serverCPU?: boolean;
	notificationServerIsDown?: boolean;
	notificationHighRequest?: boolean;
	appsMemory?: boolean;
	appsCPU?: boolean;
	appsErrorLog?: boolean;
	appsHttp?: boolean;
	appsSoket?: boolean;
	listeningPorts?: string;
	validPorts?: boolean;
}

class SettingDataForm extends React.Component<
	SettingsFormProps,
	SettingsDataState
> {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.settings,
			validPorts: true
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

	handleSubmit(event: any) {
		event.preventDefault();
		const testPorts = validatePortsString(this.state.listeningPorts);

		this.setState({
			validPorts: testPorts
		});

		if (testPorts) this.props.onSubmit(this.state);
	}

	render() {
		return (
			<form>
				<SettingFormGroupLabel>
					<Bell size="18" />
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
					<Server size="18" />
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
					<ProjectDiagram size="18" />
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
					<Globe size="18" />
					Ports
				</SettingFormGroupLabel>
				<SettingFormGroupOneInput>
					<SettingInput
						type="text"
						name="listeningPorts"
						value={
							this.state.listeningPorts
								? this.state.listeningPorts
								: ''
						}
						onChange={this.handleChange}
					/>
					{!this.state.validPorts && (
						<ErrorInputSettings>
							Enter number ports separated by commas:{' '}
							<i>8080,3060,80 etc.</i>
						</ErrorInputSettings>
					)}
				</SettingFormGroupOneInput>

				<SettingsSubmitButton onClick={this.handleSubmit}>
					<CheckSquare size="18" />
					Save All Change
				</SettingsSubmitButton>
			</form>
		);
	}
}

export default SettingDataForm;
