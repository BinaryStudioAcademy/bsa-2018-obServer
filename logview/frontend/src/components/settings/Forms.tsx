import * as React from 'react';
import {
	AddNewAppGroupInput,
	EditAppGroupInput,
	SettingInput,
	SettingInputWrapper,
	AddNewAppButton,
	EditAppFormButton,
	ErrorInputSettings
} from '../../styles/SettingsFormStyles';
import { Plus, Save, ClosedCaptioning } from 'styled-icons/fa-solid';
import { AppsState } from '../../types/AppsState';
import { ServerState } from '../../types/ServerState';
import { validatePortsString } from '../../services/validate/validate';

interface NewAppFormState {
	newAppName: string;
	newAppPort: number;
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
			newAppPort: undefined
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
		this.props.addNewApp(newAppName, newAppPort);
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
					</SettingInputWrapper>
					<SettingInputWrapper>
						<SettingInput
							type="text"
							placeholder="New App Port"
							name="appPort"
							onChange={this.handleChange}
						/>
					</SettingInputWrapper>
					<AddNewAppButton onClick={this.handleSubmit}>
						<Plus size="18" />
						Add New App
					</AddNewAppButton>
				</AddNewAppGroupInput>
			</form>
		);
	}
}

interface EditAppFormState {
	appName: string;
	appPort: number;
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
			appPort: this.props.app.port
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

	handleSubmit(event: any) {
		event.preventDefault();
		this.props.updateApp({
			id: this.props.app.id,
			name: this.state.appName,
			port: this.state.appPort
		});
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
					</SettingInputWrapper>
					<EditAppFormButton>
						<AddNewAppButton
							onClick={() => {
								this.props.fetchAppsList;
							}}
						>
							<ClosedCaptioning size="18" />
							Close
						</AddNewAppButton>
						<AddNewAppButton onClick={this.handleSubmit}>
							<Save size="18" />
							Save Change
						</AddNewAppButton>
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
		//const testPorts = validatePortsString(this.state.port);

		/* this.setState({
			validPort: testPorts
		}); */

		//if (testPorts) this.props.onSubmit(this.state);
		/* 		this.props.updateApp({
					id: this.props.app.id,
					name: this.state.appName,
					port: this.state.appPort
				}); */
		this.props.changeServerSettings(
			this.state.ip,
			this.state.port,
			this.state.ip
		);
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
								Enter number ports separated by commas:{' '}
								<i>8080,3060,80 etc.</i>
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
								Enter ip: <i>8080,3060,80 etc.</i>
							</ErrorInputSettings>
						)}
					</SettingInputWrapper>
					<AddNewAppButton onClick={this.handleSubmit}>
						<Save size="18" />
						Save Change
					</AddNewAppButton>
				</AddNewAppGroupInput>
			</form>
		);
	}
}
