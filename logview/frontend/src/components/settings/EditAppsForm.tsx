import * as React from 'react';
import {
	EditAppGroupInput,
	SettingInput,
	SettingInputWrapper,
	SubmitAppButton,
	EditAppFormButton,
	ErrorInputSettings,
	CloseAppFormButton
} from 'src/styles/SettingsFormStyles';
import { Save, Reply } from 'styled-icons/fa-solid';
import { AppsState } from 'src/types/AppsState';
import {
	validatePortNumber,
	validateAppName
} from 'src/services/validate/validate';

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

export default class EditAppForm extends React.Component<
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
