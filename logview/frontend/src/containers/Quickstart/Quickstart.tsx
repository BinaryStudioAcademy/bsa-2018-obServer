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
					<pre>
						<code>yarn add observer</code>
					</pre>
					<p>
						<strong>
							Adding observer to different categories of
							dependencies
						</strong>
					</p>
					<p>
						Add to <code>devDependencies</code>,{' '}
						<code>peerDependencies</code>, and{' '}
						<code>optionalDependencies</code> respectively:
					</p>
					<pre>
						<code>
							yarn add observer --dev
							<br />
							yarn add observer --peer
							<br />
							yarn add observer --optional
						</code>
					</pre>
					<p>
						<strong>Using observer in your code</strong>
					</p>
					<p>In your express.js application add into index.js:</p>
					<pre>
						<code>
							const logconnect = require("observer").logconnect;
							<br />
							... <br />
							app.use(logconnect);
						</code>
					</pre>
					<p>
						Then create on your server one more app, that contains
						only index.js:
					</p>
					<pre>
						<code>
							const logcollect = require("observer").logcollect;
							<br />
							logcollect.start("8080", <br />
							...options, <br />
							token: "123af12345b1a12345a6aa1234e123456ae1234b"
							<br />
							})
						</code>
					</pre>
					<p>
						Several logconnect apps send data to logcollect (port
						:8080 in this case) and logcollect sends token (which
						serves as id) to database.
					</p>
					<p>
						<strong>Upgrading observer</strong>
					</p>
					<pre>
						<code>
							yarn upgrade observer
							<br />
							yarn upgrade observer@[version]
							<br />
							yarn upgrade observer@[tag]
						</code>
					</pre>
					<hr />
				</div>
			</React.Fragment>
		);
	}
}

export default Quickstart;
