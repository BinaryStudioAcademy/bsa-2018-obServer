import * as React from 'react';
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import Quickstart from '../Quickstart/Quickstart';
import Settings from '../Settings/Settings';
import Logs from '../Logs/Logs';
import HttpStats from '../HttpStats/HttpStats';
import SocketStats from '../SocketStats/SocketStats';
import Profile from '../Profile/Profile';
import {
	SideNav,
	SideLink,
	Title,
	DashboardBackground,
	Main,
	UserBar,
	Profile as UserProfile,
	NotificationIcon
} from 'src/styles/Styles';
import ServerResources from '../ServerResources/ServerResources';
import { Dashboard as DashboardIcon } from 'styled-icons/material';
import { FileAlt } from 'styled-icons/fa-regular';
import { Server } from 'styled-icons/fa-solid';
import { Settings as SettingsIcon } from 'styled-icons/feather';
import { Terminal } from 'styled-icons/octicons';
import { Http } from 'styled-icons/material';
import { Superpowers } from 'styled-icons/fa-brands';
import { UserPopup, Sidebar } from 'src/styles/ContainerStyles';
import { CommentText, UserText } from '../../styles/TextStyles';
import { userLogout } from 'src/redux/user/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface MatchParams {
	name: string;
}

interface DashboardState {
	active?: string;
	popup?: boolean;
}

interface DashboardProps extends RouteComponentProps<MatchParams> {
	actions: { userLogout: Function };
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
	constructor(props: DashboardProps) {
		super(props);

		this.state = {
			active: '',
			popup: false
		};

		this.setActive = this.setActive.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	setActive(active) {
		this.setState({ active });
	}

	togglePopup() {
		this.setState({ popup: !this.state.popup });
	}

	handleLogout() {
		console.log(sessionStorage);
		this.props.actions.userLogout(sessionStorage.getItem('user'));
	}

	render() {
		const { match, location } = this.props;
		return (
			<DashboardBackground>
				<Sidebar>
					<SideNav>
						<Title>obServer</Title>
						<div>
							<SideLink
								active={location.pathname === '/dashboard'}
							>
								<DashboardIcon size="20px" />
								<Link to={`${match.url}`}>dashboard</Link>
							</SideLink>
							<SideLink
								active={
									location.pathname ===
									'/dashboard/quickstart'
								}
							>
								<FileAlt size="20px" />
								<Link to={`${match.url}/quickstart`}>
									quickstart
								</Link>
							</SideLink>
							<SideLink
								active={
									location.pathname === '/dashboard/settings'
								}
							>
								<SettingsIcon size="20px" />
								<Link to={`${match.url}/settings`}>
									settings
								</Link>
							</SideLink>
							<SideLink
								active={location.pathname === '/dashboard/logs'}
							>
								<Terminal size="20px" />
								<Link to={`${match.url}/logs`}>logs</Link>
							</SideLink>
							<SideLink
								active={
									location.pathname === '/dashboard/resources'
								}
							>
								<Server size="20px" />
								<Link to={`${match.url}/resources`}>
									resources
								</Link>
							</SideLink>
							<SideLink
								active={
									location.pathname === '/dashboard/httpstats'
								}
							>
								<Http size="20px" />
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
								<Superpowers size="20px" />
								<Link to={`${match.url}/socketstats`}>
									socket stats
								</Link>
							</SideLink>
						</div>
					</SideNav>
					<UserBar>
						<UserProfile>
							{/* popup */}

							<UserPopup
								popup={this.state.popup}
								onClick={this.togglePopup}
							>
								{this.state.popup && (
									<React.Fragment>
										<CommentText>
											<Link to={`${match.url}/profile`}>
												profile
											</Link>
										</CommentText>
										<CommentText>
											<Link to={`${match.url}/invite`}>
												invite user
											</Link>
										</CommentText>
										<CommentText
											onClick={this.handleLogout}
										>
											logout
										</CommentText>
									</React.Fragment>
								)}
								<UserText>
									{sessionStorage.getItem('user')}
								</UserText>
							</UserPopup>
						</UserProfile>
						<NotificationIcon size="20px" />
					</UserBar>
				</Sidebar>
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
						component={ServerResources}
					/>
					<Route
						path={`${match.url}/httpstats`}
						component={HttpStats}
					/>
					<Route
						path={`${match.url}/socketstats`}
						component={SocketStats}
					/>
					<Route path={`${match.url}/profile`} component={Profile} />
				</Main>
			</DashboardBackground>
		);
	}
}

const mapStateToProps = ({ fetchingUserStatus }) => ({
	fetchingUserStatus
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userLogout }, dispatch)
});

const DashboardConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);

export default DashboardConnected;
