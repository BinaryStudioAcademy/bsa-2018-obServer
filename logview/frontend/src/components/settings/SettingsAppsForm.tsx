import * as React from 'react';
import {
	AddNewAppGroupInput,
	SettingInput,
	SettingInputWrapper,
	AddNewAppButton
} from '../../styles/SettingsFormStyles';
import { Plus } from 'styled-icons/fa-solid';
import { AppsState } from '../../types/AppsState';
import AppsTabel from '../tabels/appsTable';

interface SettingAppsState {
	apps: Array<AppsState>;
	newApp: string;
}

interface SettingAppsFormProps {
	apps: Array<AppsState>;
	actions: {
		fetchAppsList: Function;
		addNewApp: Function;
		deleteApp: Function;
	};
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
		this.props.actions.addNewApp(this.state.newApp);
	}

	render() {
		return (
			<React.Fragment>
				<AppsTabel
					data={this.props.apps}
					deleteApp={this.props.actions.deleteApp}
				/>
				<form>
					<AddNewAppGroupInput>
						<SettingInputWrapper>
							<SettingInput
								type="text"
								placeholder="New App"
								name="newApp"
								onChange={this.handleChange}
							/>
						</SettingInputWrapper>
						<SettingInputWrapper>
							<AddNewAppButton onClick={this.handleSubmit}>
								<Plus size="18" />
								Add New App
							</AddNewAppButton>
						</SettingInputWrapper>
					</AddNewAppGroupInput>
				</form>
			</React.Fragment>
		);
	}
}

export default SettingAppsForm;
