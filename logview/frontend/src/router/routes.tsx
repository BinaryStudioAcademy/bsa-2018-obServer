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
import Socket from 'src/containers/Socket';
// import { isLoggedIn } from '../services';
import Dashboard from 'src/containers/Dashboard/Dashboard';
import 'src/styles/GlobalStyles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface RouterProps {
	actions: { userIsLogged: Function };
	fetchingUserStatus: string;
	isLoggedIn: boolean;
}

interface RouterState {
	// returns error. Add these to state, please

	// fetchingUserStatus: string;
	loggedUser: string;
}

class Router extends React.Component<RouterProps, RouterState> {
	constructor(props: any) {
		super(props);
		this.state = {
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
						<Route
							path="/dashboard"
							component={Dashboard}
							loggedUser={this.state.loggedUser}
						/>

						<Route exact path="/socket" component={Socket} />
					</Switch>
				</Background>
			</ConnectedRouter>
		);
		// );
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
	actions: bindActionCreators({}, dispatch)
});

const RouterConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Router);

export default RouterConnected;
