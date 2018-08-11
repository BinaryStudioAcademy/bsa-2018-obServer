import * as React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		!localStorage.getItem('user')
			? this.props.history.push('/login')
			: undefined;
	}
	render() {
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

export default Home;
