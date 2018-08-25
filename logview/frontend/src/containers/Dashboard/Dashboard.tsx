import * as React from 'react';
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import Quickstart from '../Quickstart/Quickstart';
import Settings from '../Settings/Settings';
import Logs from '../Logs/Logs';
import Profile from '../Profile/Profile';
import HttpStats from '../HttpStats/HttpStats';
import SocketStats from '../SocketStats/SocketStats';
import InviteUser from '../InviteUser/InviteUser';
import { Title, NotificationIcon } from 'src/styles/Styles';
import ServerResources from '../ServerResources/ServerResources';
import { userLogout } from 'src/redux/user/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface DashboardState {
	active?: string;
	popup?: boolean;
}

interface DashboardProps extends RouteComponentProps<{}, {}> {
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
		this.props.actions.userLogout(sessionStorage.getItem('user'));
	}

	render() {
		const { match, location } = this.props;
		const user = JSON.parse(sessionStorage.getItem('user'));
		return (
			<React.Fragment>
				<Route
					path={`${match.url}/quickstart`}
					component={Quickstart}
				/>
				<Route path={`${match.url}/settings`} component={Settings} />
				<Route path={`${match.url}/logs`} component={Logs} />
				<Route
					path={`${match.url}/resources`}
					component={ServerResources}
				/>
				<Route path={`${match.url}/httpstats`} component={HttpStats} />
				<Route
					path={`${match.url}/socketstats`}
					component={SocketStats}
				/>
				<Route path={`${match.url}/invite`} component={InviteUser} />
				<Route path={`${match.url}/profile`} component={Profile} />
			</React.Fragment>
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
