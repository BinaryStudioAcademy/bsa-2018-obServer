import * as React from 'react';
import {
	ServerFormsWrapper,
	ServerFormsColumn,
	SettingFormGroupLabel
} from '../../styles/SettingsFormStyles';
import { AppsState } from '../../types/AppsState';
import { ServerState } from '../../types/ServerState';
import AppsTabel from '../tabels/appsTable';
import { AddAppForm, ServerDataForm } from './Forms';
import { List } from 'styled-icons/fa-solid';
import { SecretKey } from './Utils';

interface SettingServerFormsState {}

interface SettingServerFormsProps {
	apps: Array<AppsState>;
	server: ServerState;
	actions: {
		addNewApp: Function;
		updateApp: Function;
		deleteApp: Function;
		changeServerSettings: Function;
		fetchAppsList: Function;
	};
}

export default class SettingServerForms extends React.Component<
	SettingServerFormsProps,
	SettingServerFormsState
> {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			addNewApp,
			deleteApp,
			updateApp,
			changeServerSettings,
			fetchAppsList
		} = this.props.actions;
		const { server } = this.props;
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
							fetchAppsList={fetchAppsList}
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
						<SecretKey secretKey={server.companyId} /> - your server
						token
						<ServerDataForm
							server={server}
							changeServerSettings={changeServerSettings}
						/>
					</ServerFormsColumn>
				</div>
			</ServerFormsWrapper>
		);
	}
}
