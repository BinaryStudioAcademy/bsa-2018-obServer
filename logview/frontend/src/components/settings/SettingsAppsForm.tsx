import * as React from 'react';
import {
	SettingFormGroup,
	SettingFormGroupInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingInputWrapper,
	SettingsSubmitButton
} from '../../styles/SettingsFormStyles';
import { User, UserSecret, CheckSquare } from 'styled-icons/fa-solid';
import { AppsState } from '../../types/AppsState';

interface SettingAppsState {
	apps: Array<AppsState>;
	newApp: string;
}

interface SettingAppsFormProps {
	apps: Array<AppsState>;
	onSubmit: Function;
}

class SettingAppsForm extends React.Component<
	SettingAppsFormProps,
	SettingAppsState
> {
	constructor(props) {
		super(props);
		this.state = {
			apps: this.props.apps,
			newApp: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event: any) {
		this.setState({
			newApp: event.target.value
		});
	}

	handleSubmit(event: any) {
		event.preventDefault();
		this.props.onSubmit(this.state);
	}

	render() {
		return (
			<form>
				<SettingFormGroupLabel>
					<UserSecret size="18" />
					Your Apps
				</SettingFormGroupLabel>
				<SettingFormGroup>
					<span>app1</span> - your secret key
				</SettingFormGroup>

				<SettingFormGroupLabel>
					<User size="18" />
					Add New App
				</SettingFormGroupLabel>
				<SettingFormGroupInput>
					<SettingInputWrapper>
						<SettingInput
							type="text"
							placeholder="New App"
							name="name"
							onChange={this.handleChange}
						/>
					</SettingInputWrapper>
					<SettingInputWrapper>
						<SettingsSubmitButton onClick={this.handleSubmit}>
							<CheckSquare size="18" />
							Save All Change
						</SettingsSubmitButton>
					</SettingInputWrapper>
				</SettingFormGroupInput>
			</form>
		);
	}
}

export default SettingAppsForm;
