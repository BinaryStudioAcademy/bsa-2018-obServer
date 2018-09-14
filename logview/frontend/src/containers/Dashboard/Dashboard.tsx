import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import LogsBlock from './LogsBlock/Logs';
import Profile from './Profile';
import HttpBlock from './HttpBlock/HttpBlock';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	DashboardMain,
	DashboardNav,
	DashboardWrapper,
	RowContainer,
	CenteredContainer,
	Title
} from './DashboardStyles';
import ResourcesBlock from './ResourcesBlock/ResourcesBlock';
import Notifications from '../../components/Notifications/Notifications';
import { SettingsIcon } from '../../styles/IconStyles';
import DashboardRoutes from './DashboardRoutes';
import AppsSelector from './AppsSelector';
import { getNewNotification } from '../../redux/logs/actions';
import { NotificationState, HttpStatsState } from '../../types/LogsState';
import { startChannel, stopChannel } from '../../redux/sockets/actions';
import HttpTable from './HttpTable/HttpTable';
import { Binoculars } from 'styled-icons/fa-solid';

interface DashboardState {
	active?: string;
}

interface DashboardProps extends RouteComponentProps<{}, {}> {
	actions: {
		getNewNotification: Function;
		startChannel: Function;
	};
	notificationLogs: Array<NotificationState>;
	fetchingUserStatus: string;
	httpStats: Array<HttpStatsState>;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
	constructor(props: DashboardProps) {
		super(props);

		this.state = {
			active: ''
		};

		this.setActive = this.setActive.bind(this);
	}

	componentDidMount() {
		this.props.actions.getNewNotification();
		this.props.actions.startChannel();
	}

	setActive(active, value) {
		this.setState({ active });
	}

	render() {
		const { match, location, notificationLogs } = this.props;
		const data = notificationLogs || [];

		return (
			<DashboardWrapper>
				<DashboardNav>
					<RowContainer>
						<Title>
							<Link to="/dashboard">
								<Binoculars size="25" />
								obServer
							</Link>
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
						<Notifications data={data} />
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
							<div>
								<HttpTable />
							</div>
						</React.Fragment>
					)}
				</DashboardMain>
			</DashboardWrapper>
		);
	}
}

const mapStateToProps = ({
	notificationLogs,
	fetchingUserStatus,
	httpStats
}) => ({
	notificationLogs,
	fetchingUserStatus,
	httpStats
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ getNewNotification, startChannel }, dispatch)
});

const DashboardConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);

export default DashboardConnected;
