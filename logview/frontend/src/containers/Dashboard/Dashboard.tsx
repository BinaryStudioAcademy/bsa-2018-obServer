import * as React from 'react';
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import Quickstart from '../Quickstart/Quickstart';
import Settings from '../Settings/Settings';
import Logs from '../Logs/Logs';
import LogsBlock from './Logs';
import Profile from './Profile';
import HttpStats from '../HttpStats/HttpStats';
import HttpBlock from './HttpBlock';
import SocketStats from '../SocketStats/SocketStats';
import Company from '../Company/Company';
import { DashboardMain, DashboardNav, DashboardWrapper, RowContainer, CenteredContainer, Title } from './DashboardStyles';
import {
	Profile as UserProfile, Submit,
} from '../../styles/Styles';
import Select from 'src/components/Select/Select';
import ResourcesBlock from './ResourcesBlock';
import Notifications from '../../components/Notifications/Notifications';
import { SettingsIcon } from '../../styles/IconStyles';
import ServerResources from '../ServerResources/ServerResources';
import DashboardRoutes from './DashboardRoutes';

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
			active: '',
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
                        <Title>obServer</Title>
						<CenteredContainer>
	                        <Select onActive={false} options={['app1', 'app2', 'app3']}/>
						</CenteredContainer>
                    </RowContainer>
					<RowContainer>
						<CenteredContainer>							
							<Link to="/dashboard/settings">
								<SettingsIcon size="25"/>
							</Link>
						</CenteredContainer>
						<Notifications />
						<Profile />
					</RowContainer>
                </DashboardNav>

				<DashboardRoutes url={match.url}/>
				
                <DashboardMain>
					{ location.pathname === '/dashboard' && (
						<React.Fragment>
							<div>
								<ResourcesBlock />
							</div>
							<div >
								<HttpBlock />
							</div>
							<div >
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
