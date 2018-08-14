import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from 'src/containers/Login/Login';
import Home from 'src/containers/Home/Home';
import Register from 'src/containers/Register/Register';
import PasswordReset from 'src/containers/PasswordReset/PasswordReset';
import history from './history';
import 'src/styles/GlobalStyles';
import { isLoggedIn } from '../services';

class Router extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { isLoggedIn };
		this.PrivateRoute = this.PrivateRoute.bind(this);
	}

	async componentDidMount() {
		this.setState({ isLoggedIn: await isLoggedIn() });
	}

	render() {
		return (
			<ConnectedRouter history={history}>
				<Switch>
					<this.PrivateRoute exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route
						exact
						path="/passwordreset"
						component={PasswordReset}
					/>
				</Switch>
			</ConnectedRouter>
		);
	}

	PrivateRoute({ component: Component, ...rest }) {
		return (
			<Route
				{...rest}
				render={props =>
					this.state.isLoggedIn ? (
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
	}
}

export default Router;
