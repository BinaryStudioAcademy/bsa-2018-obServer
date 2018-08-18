import * as React from 'react';
import { Route, Link, RouteComponentProps, RouteProps } from 'react-router-dom';
import Quickstart from '../Quickstart/Quickstart';
import Settings from '../Settings/Settings';
import Logs from '../Logs/Logs';
import Resources from '../Resources/Resources';
import HttpStats from '../HttpStats/HttpStats';
import SocketStats from '../SocketStats/SocketStats';
import { SideNav, SideLink } from '../../styles/Styles';
import { DashboardBackground, Main } from '../../styles/ContainerStyles';

interface MatchParams {
	name: string;
}

interface DashboardProps extends RouteComponentProps<MatchParams> {}

class Dashboard extends React.Component<DashboardProps, {}> {
	render() {
		const { match } = this.props;
		return (
			<DashboardBackground>
				<SideNav>
					<SideLink>
						<Link to={`${match.url}/quickstart`}>quickstart</Link>
					</SideLink>
					<SideLink>
						<Link to={`${match.url}/settings`}>settings</Link>
					</SideLink>
					<SideLink>
						<Link to={`${match.url}/logs`}>logs</Link>
					</SideLink>
					<SideLink>
						<Link to={`${match.url}/resources`}>resources</Link>
					</SideLink>
					<SideLink>
						<Link to={`${match.url}/httpstats`}>http stats</Link>
					</SideLink>
					<SideLink>
						<Link to={`${match.url}/socketstats`}>
							socket stats
						</Link>
					</SideLink>
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
