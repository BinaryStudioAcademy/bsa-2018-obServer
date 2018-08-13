import * as React from 'react';
import { Link } from 'react-router-dom';
const sendIcon = require('src/assets/confirm-icon.png');

class EmailConfirm extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<React.Fragment>
				<div>
					We've sent email to *here will be email* to confirm validity
					of your email address. After receiving the email, follow the
					link provided to complete the registration
				</div>
			</React.Fragment>
		);
	}
}

export default EmailConfirm;
