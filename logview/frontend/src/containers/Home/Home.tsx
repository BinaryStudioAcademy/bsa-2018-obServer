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

	componentDidMount() {
		sessionStorage.getItem('user') === undefined
			? this.props.history.push('/login')
			: undefined;
	}
	render() {
		console.log(this.props);
		console.log(sessionStorage);
		return (
			<React.Fragment>
				<div>Home component</div>
				<Link to="login">Link to login</Link>
				<div />
				<Link to="register">Link to register</Link>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ fetching }) => ({});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({}, dispatch)
});

const HomeConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

export default HomeConnected;
