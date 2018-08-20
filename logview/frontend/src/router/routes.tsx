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

class Router extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { loggedUser: sessionStorage.getItem('user') };
	}

	// async componentDidMount() {
	// 	this.setState({ loggedUser: await sessionStorage.getItem('user') });
	// }

	render() {
		return (
			<ConnectedRouter history={history}>
				<React.Fragment>
					<PrivateRoute
						exact
						path="/"
						component={Home}
						loggedUser={this.state.loggedUser}
					/>
					<Background>
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
							path="/dashboard/resources"
							component={ServerResources}
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
						<PrivateRoute
							path="/dashboard"
							component={Dashboard}
							loggedUser={this.state.loggedUser}
						/>
						<Route
							path="/setpassword/"
							component={PasswordChange}
						/>
					</Background>
				</React.Fragment>
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

export default Router;
