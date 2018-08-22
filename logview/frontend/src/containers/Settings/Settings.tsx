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

interface SettingsFormProps {}

interface SettingsFormState {
	userName?: string;
	companyName?: string;
	serverIsDown?: boolean;
	serverHighRequest?: boolean;
	serverMemory?: boolean;
	serverCpu?: boolean;
	appsMemory?: boolean;
	appsCpu?: boolean;
	appsError?: boolean;
	appsHttp?: boolean;
	appsSoket?: boolean;
	ports?: string;
}

class Settings extends React.Component<SettingsFormProps, SettingsFormState> {
	constructor(props) {
		super(props);
		this.state = {
			userName: 'User Name',
			companyName: 'Company Name',
			serverIsDown: true,
			serverHighRequest: false,
			appsMemory: true,
			appsCpu: true,
			appsError: true,
			appsHttp: false,
			appsSoket: true,
			ports: '543'
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

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state);
		console.log(this.state);
		event.preventDefault();
	}

	render() {
		return (
			<React.Fragment>
				<form onSubmit={this.handleSubmit} id="settings-form">
					<SettingFormGroupLabel>
						<User size="18" style={{ marginRight: '10px' }} />
						User Settings
					</SettingFormGroupLabel>
					<SettingFormGroupInput>
						<SettingInput
							type="text"
							placeholder="User Name"
							name="userName"
							value={this.state.userName}
							onChange={this.handleChange}
						/>
						<SettingInput
							type="text"
							placeholder="Company Name"
							name="companyName"
							value={this.state.companyName}
							onChange={this.handleChange}
						/>
					</SettingFormGroupInput>

					<SettingFormGroupLabel>
						<UserSecret size="18" style={{ marginRight: '10px' }} />
						Credentials Settings
					</SettingFormGroupLabel>
					<SettingFormGroup>
						<span>410e43a3-75f1-415f-bd5d-26757a47a58b</span> - your
						secret key
					</SettingFormGroup>

					<SettingFormGroupLabel>
						<Bell size="18" style={{ marginRight: '10px' }} />
						Notification Settings
					</SettingFormGroupLabel>
					<SettingFormGroup>
						<SettingCheckBox
							name="serverIsDown"
							label="Server is down"
							checked={this.state.serverIsDown}
							onChange={this.handleChange}
						/>
						<SettingCheckBox
							name="serverHighRequest"
							label="High Request Amount Increasing"
							checked={this.state.serverHighRequest}
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
							name="serverCpu"
							label="Server Cpu Stats"
							checked={this.state.serverCpu}
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
							name="appsCpu"
							label="Apps Usage Cpu Stats"
							checked={this.state.appsCpu}
							onChange={this.handleChange}
						/>
						<SettingCheckBox
							name="appsError"
							label="Apps Error Logs Stats"
							checked={this.state.appsError}
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
					<SettingFormGroup>
						<SettingInput
							type="text"
							name="ports"
							value={this.state.ports}
							onChange={this.handleChange}
						/>
					</SettingFormGroup>

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

export default Settings;
