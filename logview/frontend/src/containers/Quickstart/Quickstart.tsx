import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	NavAside,
	Nav,
	NavLink,
	Main,
	ContentHeader,
	ContentSubheader,
	ContentBlock,
	Pre,
	Code,
	Greeting
} from 'src/styles/QuickstartStyles';

class Quickstart extends React.Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<NavAside>
					<Link to="/">
						<NavLink>Home</NavLink>
					</Link>
					<NavLink>
						<Link to="/login">Sign In</Link>
					</NavLink>
					<NavLink>
						<Link to="/register">Sign Up</Link>
					</NavLink>
					<NavLink>
						<Link to="/reset">Reset Password</Link>
					</NavLink>
					<NavLink>
						<Link to="/change">Change Password</Link>
					</NavLink>
					<NavLink>
						<Link to="/confirm">Confirm E-mail</Link>
					</NavLink>
					<NavLink>
						<Link
							style={{ textDecoration: 'none', color: 'white' }}
							to="/dashboard/quickstart"
						>
							Quickstart
						</Link>
					</NavLink>
				</NavAside>

				<Main>
					<ContentHeader>Quick Start</ContentHeader>
					<ContentBlock>
						Now that you have registered, you can start using
						Observer. Here are some of the most common commands
						you’ll need.
					</ContentBlock>
					<ContentSubheader>
						Adding observer as dependency into your project
					</ContentSubheader>
					<ContentBlock>
						Our logcollect and logconnect applications are included
						in observer npm package. To add them into your project,
						do the following:
					</ContentBlock>
					<Pre>
						<Code>yarn add observer</Code>
					</Pre>
					<ContentSubheader>
						Adding observer to different categories of dependencies
					</ContentSubheader>
					<ContentBlock>
						Add to <code>devDependencies</code>,{' '}
						<code>peerDependencies</code>, and{' '}
						<code>optionalDependencies</code> respectively:
					</ContentBlock>
					<Pre>
						<Code>
							yarn add observer --dev
							<br />
							yarn add observer --peer
							<br />
							yarn add observer --optional
						</Code>
					</Pre>
					<ContentSubheader>
						Using observer in your code
					</ContentSubheader>
					<ContentBlock>
						In your express.js application add into index.js:
					</ContentBlock>
					<Pre>
						<Code>
							const logconnect = require("observer").logconnect;
							<br />
							<br />
							... <i>(your code here)</i>
							<br />
							<br />
							app.use(logconnect);
						</Code>
					</Pre>
					<ContentBlock>
						Then create on your server one more app, that contains
						only index.js:
					</ContentBlock>
					<Pre>
						<Code>
							const logcollect = require("observer").logcollect;
							<br />
							logcollect.start("8080", &#123;
							<br />
							&#9;...options, <br />
							&#9;token:
							"123af12345b1a12345a6aa1234e123456ae1234b"
							<br />
							})
						</Code>
					</Pre>
					<ContentBlock>
						Several logconnect apps send data to logcollect (port
						:8080 in this case) and logcollect sends token (which
						serves as id) to database.
					</ContentBlock>
					<ContentSubheader>Upgrading observer</ContentSubheader>
					<Pre>
						<Code>
							yarn upgrade observer
							<br />
							yarn upgrade observer@[version]
							<br />
							yarn upgrade observer@[tag]
						</Code>
					</Pre>
				</Main>
			</React.Fragment>
		);
	}
}

export default Quickstart;
