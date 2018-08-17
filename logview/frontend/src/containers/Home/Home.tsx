import * as React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from '../../../../node_modules/redux';
import { connect } from 'react-redux';

interface HomeProps {}

interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
	constructor(props: any) {
		super(props);
	}

	render() {
		console.log(this.props);
		console.log(sessionStorage);
		return (
			<React.Fragment>
				<div>Home component</div>
				<Link to="login">Link to login</Link>
				<Link to="socket">Socket</Link>
				<div />
				<Link to="register">Link to register</Link>
				<br />
				<Link to="/dashboard/quickstart">Quickstart</Link>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({}, dispatch)
});

const HomeConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

export default HomeConnected;
