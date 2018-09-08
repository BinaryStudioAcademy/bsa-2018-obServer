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
import { Profile as UserProfile, Submit } from '../../styles/Styles';
import Select from 'src/components/Select/Select';
import ResourcesBlock from './ResourcesBlock/ResourcesBlock';
import Notifications from 'src/components/Notifications/Notifications';
import { SettingsIcon } from '../../styles/IconStyles';
import DashboardRoutes from './DashboardRoutes';
import { getNewNotification } from 'src/redux/logs/actions';
import { NotificationState } from 'src/types/LogsState';
import { startChannel, stopChannel } from 'src/redux/sockets/actions';

interface DashboardState {
	active?: string;
}

interface DashboardProps extends RouteComponentProps<{}, {}> {
	actions: {
		getNewNotification: Function;
		startChannel: Function;
	};
	notifications: Array<NotificationState>;
    fetchingUserStatus: string;
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
		this.props.actions.startChannel();
	}

	setActive(active, value) {
		console.log(value);
		this.setState({ active });
		console.log(active);
	}

	render() {
		const { match, location, notifications } = this.props;
		const data = notifications || [];
		return (
			<DashboardWrapper>
				<DashboardNav>
					<RowContainer>
						<Title>
							<Link to="/dashboard">obServer</Link>
						</Title>
						<CenteredContainer>
							<Select
								onActive={this.setActive}
								options={[
									{
										value: 'some random id',
										name: 'app1'
									},
									{
										value: 'another random id',
										name: 'app2'
									}
								]}
							/>
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
						</React.Fragment>
					)}
				</DashboardMain>
			</DashboardWrapper>
		);
	}
}

const mapStateToProps = ({ notificationsLogs, fetchingUserStatus }) => ({
	notificationsLogs,
	fetchingUserStatus
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ getNewNotification, startChannel }, dispatch)
});

const DashboardConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);

export default DashboardConnected;
