import * as React from 'react';
import { Link } from 'react-router-dom';

class PasswordChange extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<div>
				<div>PasswordChange component</div>
				<Link to="login">Link to login</Link>
				<div />
				<Link to="register">Link to register</Link>
			</div>
		);
	}
}

export default PasswordChange;
