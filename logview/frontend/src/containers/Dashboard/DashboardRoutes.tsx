import * as React from 'react';
import SocketStats from '../SocketStats/SocketStats';
import Company from '../Company/Company';
import Quickstart from '../Quickstart/Quickstart';
import Settings from '../Settings/Settings';
import Logs from '../Logs/Logs';
import HttpStats from '../HttpStats/HttpStats';
import ServerResources from '../ServerResources/ServerResources';
import { Route, RouteComponentProps } from 'react-router-dom';

interface DashboardProps {
	url: string;
}

class DashboardRoutes extends React.Component<DashboardProps, {}> {
	render() {
		const { url } = this.props;
		return (
			<React.Fragment>
				<Route path={`${url}/quickstart`} component={Quickstart} />
				<Route path={`${url}/settings`} component={Settings} />
				<Route path={`${url}/logs`} component={Logs} />
				<Route path={`${url}/resources`} component={ServerResources} />
				<Route path={`${url}/httpstats`} component={HttpStats} />
				<Route path={`${url}/socketstats`} component={SocketStats} />
				<Route path={`${url}/company`} component={Company} />
			</React.Fragment>
		);
	}
}

export default DashboardRoutes;
