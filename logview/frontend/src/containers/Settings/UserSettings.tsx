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

import { changeSettings } from 'src/redux/settings/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface SettingsFormProps {
	onSubmit: Function;
	actions: { changeSettings: Function };
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
							//value={this.state.userName}
							//onChange={this.handleChange}
						/>
						<SettingInput
							type="text"
							placeholder="Company Name"
							name="companyName"
							//value={this.state.companyName}
							//onChange={this.handleChange}
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

					<SettingFormGroup>
						<SettingInput
							type="text"
							name="listeningPorts"
							value={this.state.listeningPorts}
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

const mapStateToProps = ({ fetchingUserStatus }) => ({
	fetchingUserStatus
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ changeSettings }, dispatch)
});

const ProfileConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);

export default ProfileConnected;
