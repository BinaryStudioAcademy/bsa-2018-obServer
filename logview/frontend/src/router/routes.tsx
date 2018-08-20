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
import Quickstart from 'src/containers/Quickstart/Quickstart';
import TrackedDataSettings from 'src/containers/Settings/TrackedDataSettings';
import UserGeneralSettings from 'src/containers/Settings/UserGeneralSettings';
import history from './history';
import 'src/styles/GlobalStyles';
import { Background } from '../styles/Styles';
import { isLoggedIn } from '../services';
import Dashboard from 'src/containers/Dashboard/Dashboard';

class Router extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { isLoggedIn };
	}

	async componentDidMount() {
		this.setState({ isLoggedIn: await isLoggedIn() });
	}

	render() {
		return (
			<ConnectedRouter history={history}>
				<React.Fragment>
					<PrivateRoute
						exact
						path="/"
						component={Home}
						isLoggedIn={this.state.isLoggedIn}
					/>
					<Background>
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/register" component={Register} />
						<Route
							exact
							path="/dashboard/resources"
							component={ServerResources}
						/>
						<Route
							exact
							path="/change/"
							component={PasswordChange}
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
						<Route
							exact
							path="/dashboard/settings/data"
							component={TrackedDataSettings}
						/>
						<Route
							exact
							path="/dashboard/settings/general"
							component={UserGeneralSettings}
						/>
						<Route path="/dashboard" component={Dashboard} />
					</Background>
				</React.Fragment>
			</ConnectedRouter>
		);
	}
}

const PrivateRoute = ({
	component: Component,
	isLoggedIn: isLoggedIn,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props =>
				isLoggedIn ? (
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

export default Router;
