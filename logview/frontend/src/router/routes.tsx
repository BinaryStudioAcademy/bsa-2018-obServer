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

class Router extends React.Component {
	render() {
		return (
			<ConnectedRouter history={history}>
				<Switch>
					<Route exact path="/" component={Home} />
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
							path="/confirm/"
							component={EmailConfirm}
						/>
						<Route path="/confirm/" component={EmailTokenConfirm} />
					</Background>
				</Switch>
			</ConnectedRouter>
		);
	}
}

export default Router;
