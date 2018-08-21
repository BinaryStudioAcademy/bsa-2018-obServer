import * as React from 'react';

import SettingCheckBox from 'src/components/settings/SettingCheckBox';

import {
	SettingFormGroup,
	SettingFormGroupLabel
} from 'src/styles/SettingsFormStyles';

import {
	Server,
	User,
	UserSecret,
	Bell,
	ProjectDiagram,
	Globe
} from 'styled-icons/fa-solid';

class Settings extends React.Component {
	render() {
		return (
			<React.Fragment>
				<SettingFormGroupLabel>
					<User size="18" style={{ marginRight: '10px' }} />
					User Settings
				</SettingFormGroupLabel>
				<SettingFormGroup>
					<input type="text" />
					<input type="text" />
				</SettingFormGroup>

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
					/>
					<SettingCheckBox
						name="serverHighRequest"
						label="High Request Amount Increasing"
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
					/>
					<SettingCheckBox
						name="serverCpu"
						label="Server Cpu Stats"
					/>
				</SettingFormGroup>

				<SettingFormGroupLabel>
					<ProjectDiagram size="18" style={{ marginRight: '10px' }} />
					Your Apps
				</SettingFormGroupLabel>
				<SettingFormGroup>
					<SettingCheckBox
						name="appsMemory"
						label="Apps Memory Stats"
					/>
					<SettingCheckBox
						name="appsCpu"
						label="Apps Usage Cpu Stats"
					/>
					<SettingCheckBox
						name="appsError"
						label="Apps Error Logs Stats"
					/>
					<SettingCheckBox name="appsHttp" label="Apps Http Stats" />
					<SettingCheckBox
						name="appsSoket"
						label="Apps Soket Stats"
					/>
				</SettingFormGroup>

				<SettingFormGroupLabel>
					<Globe size="18" style={{ marginRight: '10px' }} />
					Ports
				</SettingFormGroupLabel>
				<SettingFormGroup>
					<input type="text" />
				</SettingFormGroup>
			</React.Fragment>
		);
	}
}

export default Settings;
