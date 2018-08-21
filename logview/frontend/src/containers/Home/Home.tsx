import * as React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from '../../../../node_modules/redux';
import { connect } from 'react-redux';

import { userLogout } from 'src/redux/user/actions';

interface HomeProps {
	onSubmit: Function;
	actions: { userLogout: Function };
}

interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
	constructor(props: any) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout() {
		this.props.actions.userLogout();
		window.location.href = window.location.href;
	}

	render() {
		console.log(this.props);
		console.log(sessionStorage);
		return (
			<React.Fragment>
				<div style={{ background: '#fff', padding: '10px' }}>
					<div>Home component</div>
					<Link to="login">Link to login</Link>
					<br />
					<Link to="register">Link to register</Link>
					<br />
					<Link to="/dashboard/quickstart">Quickstart</Link>
          <Link to="/login" onClick={this.handleLogout}>
					  Log out
				  </Link>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userLogout }, dispatch)
});

const HomeConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

export default HomeConnected;
