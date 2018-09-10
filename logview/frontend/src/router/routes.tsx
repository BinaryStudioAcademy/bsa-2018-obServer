import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from '../containers/Login/Login';
import Home from '../containers/Home/Home';
import Register from '../containers/Register/Register';
import PasswordReset from '../containers/PasswordReset/PasswordReset';
import PasswordChange from '../containers/PasswordChange/PasswordChange';
import EmailConfirm from '../containers/EmailConfirm/EmailConfirm';
import EmailTokenConfirm from '../containers/EmailConfirm/EmailTokenConfirm';
import NotFoundPage from '../containers/NotFoundPage/NotFoundPage';
import history from './history';
import '../styles/GlobalStyles';
import Dashboard from '../containers/Dashboard/Dashboard';
import '../styles/GlobalStyles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserChangeCompany from '../containers/UserChangeCompany/UserChangeCompany';

interface RouterProps {
	actions: { userIsLogged: Function };
	fetchingUserStatus: string;
	isLoggedIn: boolean;
}

interface RouterState {
	loggedUser: string;
}

class Router extends React.Component<RouterProps, RouterState> {
	constructor(props: any) {
		super(props);
		this.state = {
			// seems we don't need this
			loggedUser: JSON.parse(sessionStorage.getItem('observerUser'))
		};
	}
	componentDidMount() {}

	render() {
		const { fetchingUserStatus } = this.props;
		return (
			// (fetchingUserStatus === 'success' ||
			// 	fetchingUserStatus === 'failed') && (
			<ConnectedRouter history={history}>
				<Switch>
					<PrivateRoute
						exact
						path="/"
						component={Home}
						loggedUser={this.state.loggedUser}
					/>
					<UnauthorizedRoute
						exact
						path="/login"
						component={Login}
						loggedUser={this.state.loggedUser}
					/>
					<UnauthorizedRoute
						exact
						path="/register"
						component={Register}
						loggedUser={this.state.loggedUser}
					/>
					<UnauthorizedRoute
						exact
						path="/reset"
						component={PasswordReset}
						loggedUser={this.state.loggedUser}
					/>
					<Route
						exact
						path="/change/"
						component={PasswordChange}
						loggedUser={this.state.loggedUser}
					/>
					<Route
						exact
						path="/confirmationsent"
						component={EmailConfirm}
					/>
					<Route
						exact
						path="/confirm/"
						component={EmailTokenConfirm}
					/>
					<Route
						exact
						path="/setpassword/"
						component={PasswordChange}
					/>
					<PrivateRoute
						path="/dashboard"
						component={Dashboard}
						loggedUser={this.state.loggedUser}
					/>
					<Route
						path="/company-change"
						component={UserChangeCompany}
					/>
					<Route path="*" component={NotFoundPage} />
				</Switch>
			</ConnectedRouter>
		);
	}
}

const PrivateRoute = ({
	component: Component,
	loggedUser: loggedUser,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props =>
				sessionStorage.getItem('observerUser') ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
};

const UnauthorizedRoute = ({
	component: Component,
	loggedUser: loggedUser,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props =>
				sessionStorage.getItem('observerUser') ? (
					<Redirect
						to={{
							pathname: '/dashboard',
							state: { from: props.location }
						}}
					/>
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

const mapStateToProps = ({ fetchingUserStatus, isLoggedIn }) => ({
	fetchingUserStatus,
	isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({}, dispatch)
});

const RouterConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Router);

export default RouterConnected;
