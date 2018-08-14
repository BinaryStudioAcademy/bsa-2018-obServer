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
		this.redirectNoAuth = this.redirectNoAuth.bind(this);
	}

	async componentDidMount() {
		this.setState({ isLoggedIn: await isLoggedIn() });
	}

	redirectNoAuth() {
		return !this.state.isLoggedIn ? <Redirect to="/login" /> : <Home />;
	}

	render() {
		return (
			<ConnectedRouter history={history}>
				<Switch>
					<Route
						exact
						path="/"
						render={() => {
							return this.redirectNoAuth();
						}}
					/>
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
}

export default Router;
