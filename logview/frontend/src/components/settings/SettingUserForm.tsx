import * as React from 'react';
import {
	SettingFormGroup,
	SettingFormGroupInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingsSubmitButton,
	ErrorInputSettings
} from 'src/styles/SettingsFormStyles';
import { validateUserSetingForm } from 'src/services/validate/validate';
import { User, UserSecret, CheckSquare } from 'styled-icons/fa-solid';
import { UserState } from 'src/types/UserState';

interface SettingsUserState {
	name?: string;
	email?: string;
	company?: string;
	companyId?: string;
	validateState?: {
		name: boolean;
		company: boolean;
	};
}

interface SettingsUserFormProps {
	user: UserState;
	onSubmit: Function;
}

class SettingUserForm extends React.Component<
	SettingsUserFormProps,
	SettingsUserState
> {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.user,
			validateState: {
				name: true,
				company: true
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event: any) {
		const target = event.target;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event: any) {
		event.preventDefault();
		let obj = {
			name: this.state.name,
			company: this.state.company
		};

		let validateState = validateUserSetingForm(obj);
		this.setState({ validateState: validateState });
		let errors = [];
		for (let errorStatus in validateState) {
			errors.push(validateState[errorStatus]);
		}
		errors.indexOf(false) ? undefined : this.props.onSubmit(obj);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} id="settings-user-form">
				<SettingFormGroupLabel>
					<User size="18" style={{ marginRight: '10px' }} />
					User Settings
				</SettingFormGroupLabel>
				<SettingFormGroupInput>
					<SettingInput
						type="text"
						placeholder="User Name"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<SettingInput
						type="text"
						placeholder="Company Name"
						name="company"
						value={this.state.company}
						onChange={this.handleChange}
					/>
					{!this.state.validateState.name && (
						<ErrorInputSettings>
							Name can only contain letters
						</ErrorInputSettings>
					)}
					{!this.state.validateState.company && (
						<ErrorInputSettings>
							Company should be at least 3 characters long
						</ErrorInputSettings>
					)}
				</SettingFormGroupInput>

				<SettingFormGroupLabel>
					<UserSecret size="18" style={{ marginRight: '10px' }} />
					Credentials Settings
				</SettingFormGroupLabel>
				<SettingFormGroup>
					<span>{this.state.companyId}</span> - your secret key
				</SettingFormGroup>

				<SettingsSubmitButton
					type="submit"
					form="settings-user-form"
					value="Submit"
				>
					<CheckSquare size="18" style={{ marginRight: '10px' }} />
					Save All Change
				</SettingsSubmitButton>
			</form>
		);
	}
}

export default SettingUserForm;
