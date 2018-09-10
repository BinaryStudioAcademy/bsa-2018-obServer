import * as React from 'react';
import { Route, Link, RouteComponentProps, Redirect } from 'react-router-dom';
import { UserEdit, Database, Server } from 'styled-icons/fa-solid';
import UserSettings from './UserSettings';
import DataSettings from './DataSettings';
import ServerSettings from './ServerSettings';
import {
	SettingsMenuLink,
	SettingsMenuWrapper
} from 'src/styles/SettingsFormStyles';

interface MatchParams {}

interface SettingsState {
	active?: string;
}

class Settings extends React.Component<
	RouteComponentProps<MatchParams>,
	SettingsState
> {
	constructor(props: RouteComponentProps<MatchParams>) {
		super(props);
	}
	render() {
		const { match, location } = this.props;
		return (
			<React.Fragment>
				<SettingsMenuWrapper>
					<SettingsMenuLink
						active={
							location.pathname === '/dashboard/settings/user'
						}
					>
						<Link to={`${match.url}/user`}>
							<UserEdit size="24" />
							User Settings
						</Link>
					</SettingsMenuLink>
					<SettingsMenuLink
						active={
							location.pathname === '/dashboard/settings/data'
						}
					>
						<Link to={`${match.url}/data`}>
							<Database size="24" />
							Data Settings
						</Link>
					</SettingsMenuLink>
					<SettingsMenuLink
						active={
							location.pathname === '/dashboard/settings/server'
						}
					>
						<Link to={`${match.url}/server`}>
							<Server size="24" />
							Server Settings
						</Link>
					</SettingsMenuLink>
				</SettingsMenuWrapper>
				<Route
					exact
					path={`${match.url}/`}
					render={() => <Redirect to={`${match.url}/user`} />}
				/>
				<Route
					exact
					path={`${match.url}/user`}
					component={UserSettings}
				/>
				<Route
					exact
					path={`${match.url}/data`}
					component={DataSettings}
				/>
				<Route
					exact
					path={`${match.url}/server`}
					component={ServerSettings}
				/>
			</React.Fragment>
		);
	}
}

export default Settings;
