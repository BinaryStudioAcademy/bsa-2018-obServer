import * as React from 'react';
import {
	SettingFormGroup,
	SettingFormGroupInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingsSubmitButton
} from 'src/styles/SettingsFormStyles';
import { User, UserSecret, CheckSquare } from 'styled-icons/fa-solid';

import { UserState } from 'src/types/UserState';

interface SettingsUserFormProps {
	user: UserState;
	onSubmit: Function;
}

class SettingUserForm extends React.Component<
	SettingsUserFormProps,
	UserState
> {
	constructor(props) {
		super(props);
		this.state = this.props.user;
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
		this.props.onSubmit(this.state);
	}

	render() {
		console.log('cxc', this.state);
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
				</SettingFormGroupInput>

				<SettingFormGroupLabel>
					<UserSecret size="18" style={{ marginRight: '10px' }} />
					Credentials Settings
				</SettingFormGroupLabel>
				<SettingFormGroup>
					<span>410e43a3-75f1-415f-bd5d-26757a47a58b</span> - your
					secret key
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
