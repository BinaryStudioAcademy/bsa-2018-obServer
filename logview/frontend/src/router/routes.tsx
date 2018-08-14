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
	}

	async componentDidMount() {
		this.setState({ isLoggedIn: await isLoggedIn() });
	}

	render() {
		return (
			<ConnectedRouter history={history}>
				<Switch>
					<PrivateRoute
						exact
						path="/"
						component={Home}
						isLoggedIn={this.state.isLoggedIn}
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
