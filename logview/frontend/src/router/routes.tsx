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
import Dashboard from 'src/containers/Dashboard/Dashboard';
import { Background } from '../styles/Styles';
import 'src/styles/GlobalStyles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userIsLogged } from 'src/redux/user/actions';

interface RouterProps {
	actions: { userIsLogged: Function };
	fetchingUserStatus: string;
	isLoggedIn: boolean;
}

interface RouterState {
	isLoggedIn: boolean;
	fetchingUserStatus: string;
}

class Router extends React.Component<RouterProps, RouterState> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		this.props.actions.userIsLogged();
	}

	render() {
		const { isLoggedIn, fetchingUserStatus } = this.props;
		return (
			(isLoggedIn === true ||
				(isLoggedIn === false && fetchingUserStatus !== 'pending')) && (
				<ConnectedRouter history={history}>
					<Background>
						<Switch>
							<PrivateRoute
								exact
								path="/"
								component={Home}
								isLoggedIn={isLoggedIn}
							/>
							<Route exact path="/login" component={Login} />
							<Route
								exact
								path="/register"
								component={Register}
							/>
							<Route
								exact
								path="/reset"
								component={PasswordReset}
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
							<PrivateRoute
								path="/dashboard"
								component={Dashboard}
								isLoggedIn={isLoggedIn}
							/>
						</Switch>
					</Background>
				</ConnectedRouter>
			)
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

const mapStateToProps = ({ fetchingUserStatus, isLoggedIn }) => ({
	fetchingUserStatus,
	isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userIsLogged }, dispatch)
});

const RouterConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Router);

export default RouterConnected;
