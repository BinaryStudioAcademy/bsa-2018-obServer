import * as React from 'react';
import {
	AddNewAppGroupInput,
	SettingInput,
	SettingInputWrapper,
	SubmitAppButton,
	ErrorInputSettings
} from '../../styles/SettingsFormStyles';
import { Save } from 'styled-icons/fa-solid';
import { ServerState } from '../../types/ServerState';
import {
	validatePortNumber,
	validateServeIp
} from '../../services/validate/validate';

interface ServerDataFormState {
	port: string;
	ip: string;
	validPort: boolean;
	validIp: boolean;
}

interface ServerDataFormProps {
	changeServerSettings: Function;
	server: ServerState;
}

export default class ServerDataForm extends React.Component<
	ServerDataFormProps,
	ServerDataFormState
> {
	constructor(props) {
		super(props);
		const { logcollectAddress, logcollectPort } = this.props.server;
		this.state = {
			port: logcollectPort,
			ip: logcollectAddress,
			validPort: true,
			validIp: true
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event: any) {
		switch (event.target.name) {
			case 'serverPort': {
				this.setState({
					port: event.target.value
				});
				break;
			}
			case 'serverIp': {
				this.setState({
					ip: event.target.value
				});
				break;
			}
			default:
				break;
		}
	}

	handleSubmit(event: any) {
		event.preventDefault();
		const testPort = validatePortNumber(this.state.port);
		const testIp = validateServeIp(this.state.ip);

		this.setState({
			validPort: testPort,
			validIp: testIp
		});

		if (testPort && testIp) {
			this.props.changeServerSettings(
				this.state.ip,
				this.state.port,
				this.state.ip
			);
		}
	}

	render() {
		return (
			<form>
				<AddNewAppGroupInput>
					<SettingInputWrapper>
						<label>Server Port:</label>
						<SettingInput
							type="text"
							name="serverPort"
							value={this.state.port ? this.state.port : ''}
							onChange={this.handleChange}
						/>
						{!this.state.validPort && (
							<ErrorInputSettings>
								Enter number between the range of <b>0</b> and{' '}
								<b>65535</b>.
							</ErrorInputSettings>
						)}
					</SettingInputWrapper>
					<SettingInputWrapper>
						<label>Server IP:</label>
						<SettingInput
							type="text"
							name="serverIp"
							value={this.state.ip ? this.state.ip : ''}
							onChange={this.handleChange}
						/>
						{!this.state.validIp && (
							<ErrorInputSettings>
								Enter valid IP address!
							</ErrorInputSettings>
						)}
					</SettingInputWrapper>
					<SubmitAppButton onClick={this.handleSubmit}>
						<Save size="18" />
						Save Change
					</SubmitAppButton>
				</AddNewAppGroupInput>
			</form>
		);
	}
}
