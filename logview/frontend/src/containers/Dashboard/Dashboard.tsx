import * as React from 'react';
import { Route, Link, RouteComponentProps, RouteProps } from 'react-router-dom';
import Quickstart from '../Quickstart/Quickstart';
import Settings from '../Settings/Settings';
import Logs from '../Logs/Logs';
import Resources from '../Resources/Resources';
import HttpStats from '../HttpStats/HttpStats';
import SocketStats from '../SocketStats/SocketStats';
import {
	SideNav,
	SideLink,
	Title,
	DashboardBackground,
	Main,
	UserBar,
	Profile,
	NotificationIcon
} from 'src/styles/Styles';

interface MatchParams {
	name: string;
}

interface DashboardState {
	active?: string;
}

interface DashboardProps extends RouteComponentProps<MatchParams> {}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
	constructor(props: DashboardProps) {
		super(props);

		this.state = {
			active: ''
		};

		this.setActive = this.setActive.bind(this);
	}

	setActive(active) {
		this.setState({ active });
	}

	render() {
		const { match, location } = this.props;
		return (
			<DashboardBackground>
				<SideNav>
					<div>
						<Title>obServer</Title>
						<div>
							<SideLink
								active={
									location.pathname ===
									'/dashboard/quickstart'
								}
							>
								<Link to={`${match.url}/quickstart`}>
									quickstart
								</Link>
							</SideLink>
							<SideLink
								active={
									location.pathname === '/dashboard/settings'
								}
							>
								<Link to={`${match.url}/settings`}>
									settings
								</Link>
							</SideLink>
							<SideLink
								active={location.pathname === '/dashboard/logs'}
							>
								<Link to={`${match.url}/logs`}>logs</Link>
							</SideLink>
							<SideLink
								active={
									location.pathname === '/dashboard/resources'
								}
							>
								<Link to={`${match.url}/resources`}>
									resources
								</Link>
							</SideLink>
							<SideLink
								active={
									location.pathname === '/dashboard/httpstats'
								}
							>
								<Link to={`${match.url}/httpstats`}>
									http stats
								</Link>
							</SideLink>
							<SideLink
								active={
									location.pathname ===
									'/dashboard/socketstats'
								}
							>
								<Link to={`${match.url}/socketstats`}>
									socket stats
								</Link>
							</SideLink>
						</div>
					</div>
					<UserBar>
						<Profile>Harry Pankiv</Profile>
						<NotificationIcon size="20px" />
					</UserBar>
				</SideNav>
				<Main>
					<Route
						path={`${match.url}/quickstart`}
						component={Quickstart}
					/>
					<Route
						path={`${match.url}/settings`}
						component={Settings}
					/>
					<Route path={`${match.url}/logs`} component={Logs} />
					<Route
						path={`${match.url}/resources`}
						component={Resources}
					/>
					<Route
						path={`${match.url}/httpstats`}
						component={HttpStats}
					/>
					<Route
						path={`${match.url}/socketstats`}
						component={SocketStats}
					/>
				</Main>
			</DashboardBackground>
		);
	}
}

export default Dashboard;
