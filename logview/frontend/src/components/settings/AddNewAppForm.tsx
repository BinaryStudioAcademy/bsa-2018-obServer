import * as React from 'react';
import {
	AddNewAppGroupInput,
	SettingInput,
	SettingInputWrapper,
	SubmitAppButton,
	ErrorInputSettings
} from '../../styles/SettingsFormStyles';
import { Plus } from 'styled-icons/fa-solid';
import {
	validatePortNumber,
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

export default class AddAppForm extends React.Component<
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
								Enter the latin letters name of at least 3
								symbols!
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
