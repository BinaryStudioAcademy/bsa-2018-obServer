import * as React from 'react';
import {
	AddNewAppGroupInput,
	EditAppGroupInput,
	SettingInput,
	SettingInputWrapper,
	AddNewAppButton,
	EditAppFormButton
} from '../../styles/SettingsFormStyles';
import { Plus, Save, ClosedCaptioning } from 'styled-icons/fa-solid';
import { AppsState } from '../../types/AppsState';

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
						<AddNewAppButton onClick={this.handleSubmit}>
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
