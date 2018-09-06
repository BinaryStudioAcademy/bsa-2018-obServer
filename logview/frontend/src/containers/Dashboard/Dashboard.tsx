import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import LogsBlock from './LogsBlock/Logs';
import Profile from './Profile';
import HttpBlock from './HttpBlock/HttpBlock';
import {
	DashboardMain,
	DashboardNav,
	DashboardWrapper,
	RowContainer,
	CenteredContainer,
	Title
} from './DashboardStyles';
import { Profile as UserProfile, Submit } from '../../styles/Styles';
import Select from 'src/components/Select/Select';
import ResourcesBlock from './ResourcesBlock/ResourcesBlock';
import Notifications from '../../components/Notifications/Notifications';
import { SettingsIcon } from '../../styles/IconStyles';
import DashboardRoutes from './DashboardRoutes';
import AppsSelector from './AppsSelector';

interface DashboardState {
	active?: string;
}

interface DashboardProps extends RouteComponentProps<{}, {}> {
	actions: { userLogout: Function; fetchUser: Function };
}

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
			<DashboardWrapper>
				<DashboardNav>
					<RowContainer>
						<Title>
							<Link to="/dashboard">obServer</Link>
						</Title>
						<CenteredContainer>
							<AppsSelector />
						</CenteredContainer>
					</RowContainer>
					<RowContainer>
						<CenteredContainer>
							<Link to="/dashboard/settings">
								<SettingsIcon size="25" />
							</Link>
						</CenteredContainer>
						<Notifications />
						<Profile />
					</RowContainer>
				</DashboardNav>

				<DashboardRoutes url={match.url} />

				<DashboardMain>
					{location.pathname === '/dashboard' && (
						<React.Fragment>
							<div>
								<ResourcesBlock />
							</div>
							<div>
								<HttpBlock />
							</div>
							<div>
								<LogsBlock />
							</div>
						</React.Fragment>
					)}
				</DashboardMain>
			</DashboardWrapper>
		);
	}
}

export default Dashboard;
