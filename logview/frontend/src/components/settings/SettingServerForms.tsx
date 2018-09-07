import * as React from 'react';
import {
	ServerFormsWrapper,
	ServerFormsColumn,
	SettingFormGroupLabel
} from '../../styles/SettingsFormStyles';
import { AppsState } from '../../types/AppsState';
import AppsTabel from '../tabels/appsTable';
import { AddAppForm } from './AppForms';
import { List } from 'styled-icons/fa-solid';

interface SettingServerFormsState {
	apps: Array<AppsState>;
}

interface SettingServerFormsProps {
	apps: Array<AppsState>;
	actions: {
		fetchAppsList: Function;
		addNewApp: Function;
		updateApp: Function;
		deleteApp: Function;
	};
}

export default class SettingServerForms extends React.Component<
	SettingServerFormsProps,
	SettingServerFormsState
> {
	constructor(props) {
		super(props);
		this.state = {
			apps: this.props.apps
		};
	}

	render() {
		const { addNewApp, deleteApp, updateApp } = this.props.actions;
		return (
			<ServerFormsWrapper>
				<div>
					<SettingFormGroupLabel>
						<List size="18" />
						Your Apps
					</SettingFormGroupLabel>
					<ServerFormsColumn>
						<AppsTabel
							data={this.props.apps}
							deleteApp={deleteApp}
							updateApp={updateApp}
						/>
						<AddAppForm addNewApp={addNewApp} />
					</ServerFormsColumn>
				</div>
				<div>
					<SettingFormGroupLabel>
						<List size="18" />
						Your Server
					</SettingFormGroupLabel>
					<ServerFormsColumn>
						<span>{443443}</span> - your secret key
					</ServerFormsColumn>
				</div>
			</ServerFormsWrapper>
		);
	}
}
