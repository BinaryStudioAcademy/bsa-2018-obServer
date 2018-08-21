import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from 'src/containers/Login/Login';
import Home from 'src/containers/Home/Home';
import Register from 'src/containers/Register/Register';
import PasswordReset from 'src/containers/PasswordReset/PasswordReset';
import PasswordChange from 'src/containers/PasswordChange/PasswordChange';
import EmailConfirm from 'src/containers/EmailConfirm/EmailConfirm';
import EmailTokenConfirm from 'src/containers/EmailConfirm/EmailTokenConfirm';
import ServerResources from 'src/containers/ServerResources/ServerResources';
import history from './history';
import 'src/styles/GlobalStyles';
import { Background } from '../styles/Styles';
// import { isLoggedIn } from '../services';
import Dashboard from 'src/containers/Dashboard/Dashboard';
import 'src/styles/GlobalStyles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userIsLogged } from 'src/redux/user/actions';

interface RouterProps {
	actions: { userIsLogged: Function };
	fetchingUserStatus: string;
	isLoggedIn: boolean;
}

interface RouterState {
	// returns error 
	// Add these to state, please

	// isLoggedIn: boolean;
	// fetchingUserStatus: string;
	loggedUser: string;
}

class Router extends React.Component<RouterProps, RouterState> {
	constructor(props: any) {
		super(props);
		this.state = { loggedUser: sessionStorage.getItem('user') };
	}
	
	componentDidMount() {
		this.props.actions.userIsLogged();
	}

	render() {
		const { isLoggedIn, fetchingUserStatus } = this.props;
		return (
			(fetchingUserStatus === 'success' ||
				fetchingUserStatus === 'failed') && (
				<ConnectedRouter history={history}>
					<Background>
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
							<PrivateRoute
								exact
								path="/change/"
								component={PasswordChange}
								loggedUser={this.state.loggedUser}
							/>
							<Route
								exact
								strict
								path="/confirm"
								component={EmailConfirm}
							/>
							<Route
								exact
								strict
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
						</Switch>
					</Background>
				</ConnectedRouter>
			)
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
				loggedUser ? (
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
				loggedUser ? (
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
	actions: bindActionCreators({ userIsLogged }, dispatch)
});

const RouterConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Router);

export default RouterConnected;
