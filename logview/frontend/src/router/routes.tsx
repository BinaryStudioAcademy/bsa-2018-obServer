import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from 'src/containers/Login/Login';
import Home from 'src/containers/Home/Home';
import Register from 'src/containers/Register/Register';
import PasswordReset from 'src/containers/PasswordReset/PasswordReset';
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
