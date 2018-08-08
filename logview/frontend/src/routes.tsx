import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import PasswordReset from './containers/PasswordReset/PasswordReset';
import history from './history';

const Router = () => (
	<BrowserRouter>
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/passwordreset" component={PasswordReset} />
			</Switch>
		</ConnectedRouter>
	</BrowserRouter>
);

export default Router;
