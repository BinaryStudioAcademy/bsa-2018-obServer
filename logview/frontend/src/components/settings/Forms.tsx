import * as React from 'react';
import {
	AddNewAppGroupInput,
	EditAppGroupInput,
	SettingInput,
	SettingInputWrapper,
	SubmitAppButton,
	EditAppFormButton,
	ErrorInputSettings,
	CloseAppFormButton
} from '../../styles/SettingsFormStyles';
import { Plus, Save, Reply } from 'styled-icons/fa-solid';
import { AppsState } from '../../types/AppsState';
import { ServerState } from '../../types/ServerState';
import {
	validatePortNumber,
	validateServeIp,
	validateAppName
} from '../../services/validate/validate';

interface NewAppFormState {
	newAppName: string;
	newAppPort: string;
	validPort: boolean;
	validName: boolean;
}

interface NewAppFormProps {
	addNewApp: Function;
}

export class AddAppForm extends React.Component<
	NewAppFormProps,
	NewAppFormState
> {
	constructor(props) {
		super(props);
		this.state = {
			newAppName: '',
			newAppPort: null,
			validPort: true,
			validName: true
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event: any) {
		switch (event.target.name) {
			case 'appName': {
				this.setState({
					newAppName: event.target.value
				});
				break;
			}
			case 'appPort': {
				this.setState({
					newAppPort: event.target.value
				});
				break;
			}
			default:
				break;
		}
	}

	handleSubmit(event: any) {
		event.preventDefault();
		const { newAppName, newAppPort } = this.state;
		const testPort = validatePortNumber(newAppPort);
		const testName = validateAppName(newAppName);

		this.setState({
			validPort: testPort,
			validName: testName
		});

		if (testPort && testName) {
			this.props.addNewApp(newAppName, newAppPort);
		}
	}

	render() {
		return (
			<form>
				<AddNewAppGroupInput>
					<SettingInputWrapper>
						<SettingInput
							type="text"
							placeholder="New App Name"
							name="appName"
							onChange={this.handleChange}
						/>
						{!this.state.validName && (
							<ErrorInputSettings>
								Enter the name of at least 3 symbols!
							</ErrorInputSettings>
						)}
					</SettingInputWrapper>
					<SettingInputWrapper>
						<SettingInput
							type="text"
							placeholder="New App Port"
							name="appPort"
							onChange={this.handleChange}
						/>
						{!this.state.validPort && (
							<ErrorInputSettings>
								Enter number between the range of <b>0</b> and{' '}
								<b>65535</b>.
							</ErrorInputSettings>
						)}
					</SettingInputWrapper>
					<SubmitAppButton onClick={this.handleSubmit}>
						<Plus size="18" />
						Add New App
					</SubmitAppButton>
				</AddNewAppGroupInput>
			</form>
		);
	}
}

interface EditAppFormState {
	appName: string;
	appPort: string;
	validPort: boolean;
	validName: boolean;
}

interface EditAppFormProps {
	updateApp: Function;
	fetchAppsList: Function;
	app: AppsState;
}

export class EditAppForm extends React.Component<
	EditAppFormProps,
	EditAppFormState
> {
	constructor(props) {
		super(props);
		this.state = {
			appName: this.props.app.name,
			appPort: `${this.props.app.port}`,
			validPort: true,
			validName: true
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleChange(event: any) {
		switch (event.target.name) {
			case 'appName': {
				this.setState({
					appName: event.target.value
				});
				break;
			}
			case 'appPort': {
				this.setState({
					appPort: event.target.value
				});
				break;
			}
			default:
				break;
		}
	}

	handleClose() {
		this.props.fetchAppsList();
	}

	handleSubmit(event: any) {
		event.preventDefault();
		const testPort = validatePortNumber(this.state.appPort);
		const testName = validateAppName(this.state.appName);

		this.setState({
			validPort: testPort,
			validName: testName
		});

		if (testPort && testName) {
			this.props.updateApp({
				id: this.props.app.id,
				name: this.state.appName,
				port: this.state.appPort
			});
		}
	}

	render() {
		const { appName, appPort } = this.state;
		return (
			<form>
				<EditAppGroupInput>
					<SettingInputWrapper>
						<label>App Name:</label>
						<SettingInput
							type="text"
							placeholder="App Name"
							name="appName"
							value={appName}
							onChange={this.handleChange}
						/>
						{!this.state.validName && (
							<ErrorInputSettings>
								Enter the name of at least 3 symbols!
							</ErrorInputSettings>
						)}
					</SettingInputWrapper>
					<SettingInputWrapper>
						<label>App Port:</label>
						<SettingInput
							type="text"
							placeholder="App Port"
							name="appPort"
							value={appPort}
							onChange={this.handleChange}
						/>
						{!this.state.validPort && (
							<ErrorInputSettings>
								Enter number between the range of <b>0</b> and{' '}
								<b>65535</b>.
							</ErrorInputSettings>
						)}
					</SettingInputWrapper>
					<EditAppFormButton>
						<CloseAppFormButton onClick={this.handleClose}>
							<Reply size="18" />
							Back to list
						</CloseAppFormButton>
						<SubmitAppButton onClick={this.handleSubmit}>
							<Save size="18" />
							Save Change
						</SubmitAppButton>
					</EditAppFormButton>
				</EditAppGroupInput>
			</form>
		);
	}
}

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

export class ServerDataForm extends React.Component<
	ServerDataFormProps,
	ServerDataFormState
> {
	constructor(props) {
		super(props);
		const { logcollectAddress, logcollectPort } = this.props.server;
		console.log('dd', this.props.server);
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
