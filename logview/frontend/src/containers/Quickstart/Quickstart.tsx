import * as React from 'react';
import { Link } from 'react-router-dom';

class Quickstart extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		sessionStorage.getItem('user') === undefined
			? this.props.history.push('/dashboard/quickstart')
			: undefined;
	}

	render() {
		return (
			<React.Fragment>

				<Link to="/">Home</Link>
				<div>
					<h1>Quick Start</h1>
					<p>
						Now that you have registered, you can start using
						Observer. Here are some of the most common commands
						you’ll need.
					</p>
					<p>
						<strong>
							Adding observer as dependency into your project
						</strong>
					</p>
					<p>
						Our logcollect and logconnect applications are included
						in observer npm package. To add them into your project,
						do the following:
					</p>
					<hr />
				</div>
			</React.Fragment>
		);
	}
}

export default Quickstart;
