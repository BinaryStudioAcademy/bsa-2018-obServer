import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from 'src/containers/Login/Login';
import Home from 'src/containers/Home/Home';
import Register from 'src/containers/Register/Register';
import PasswordReset from 'src/containers/PasswordReset/PasswordReset';
import PasswordChange from 'src/containers/PasswordChange/PasswordChange';
import EmailConfirm from 'src/containers/EmailConfirm/EmailConfirm';
import history from './history';
import 'src/styles/GlobalStyles';

class Router extends React.Component {
	render() {
		return (
			<ConnectedRouter history={history}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/reset" component={PasswordReset} />
					<Route exact path="/change/" component={PasswordChange} />
					<Route exact path="/confirm/" component={EmailConfirm} />
				</Switch>
			</ConnectedRouter>
		);
	}
}

export default Router;
