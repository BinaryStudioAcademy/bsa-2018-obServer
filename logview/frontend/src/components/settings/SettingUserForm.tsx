import * as React from 'react';
import {
	SettingFormGroupInput,
	SettingFormGroupLabel,
	SettingInput,
	SettingInputWrapper,
	SettingsSubmitButton,
	ErrorInputSettings,
	SettingsForm,
	SettingsWrapper
} from '../../styles/SettingsFormStyles';
import { User, CheckSquare } from 'styled-icons/fa-solid';
import { UserState } from '../../types/UserState';
import { validateUsersNameData } from '../../services/validate/validate';

interface SettingsUserState {
	name?: string;
	email?: string;
	company?: string;
	companyId?: string;
	validName?: boolean;
	validCompanyName?: boolean;
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
			validName: true,
			validCompanyName: true
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
		const testName = validateUsersNameData(this.state.name);
		const testCompanyName = validateUsersNameData(this.state.company);

		this.setState({
			validName: testName,
			validCompanyName: testCompanyName
		});

		if (testName && testCompanyName) {
			this.props.onSubmit(this.state);
		}
	}

	render() {
		return (
			<SettingsForm>
				<SettingFormGroupLabel>
					<User size="18" />
					User Settings
				</SettingFormGroupLabel>
				<SettingsWrapper>
					<SettingInputWrapper>
						<label>User Name:</label>
						<SettingInput
							type="text"
							placeholder="User Name"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
						/>
						{!this.state.validName && (
							<ErrorInputSettings>
								Enter the name of at least 3 symbols!
							</ErrorInputSettings>
						)}
					</SettingInputWrapper>
					<SettingInputWrapper>
						<label>Company Name:</label>
						<SettingInput
							type="text"
							placeholder="Company Name"
							name="company"
							value={this.state.company}
							onChange={this.handleChange}
						/>
						{!this.state.validCompanyName && (
							<ErrorInputSettings>
								Enter the company name of at least 3 symbols!
							</ErrorInputSettings>
						)}
					</SettingInputWrapper>
				</SettingsWrapper>

				<SettingsSubmitButton onClick={this.handleSubmit}>
					Save All Change
				</SettingsSubmitButton>
			</SettingsForm>
		);
	}
}

export default SettingUserForm;
