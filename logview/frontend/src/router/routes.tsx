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
import history from './history';
import 'src/styles/GlobalStyles';
import { Background } from '../styles/Styles';
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
					<Background>
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/reset" component={PasswordReset} />
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
					</Background>
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
