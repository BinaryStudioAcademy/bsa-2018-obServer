import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	NavAside,
	Nav,
	UserInfo,
	NavLink,
	UserControl,
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
					<UserInfo>
						{`CompanyName`}
						<br />
						{`UserName`}
					</UserInfo>
					<Nav>
						<UserControl>
							<Link to="/login">sign in</Link>
						</UserControl>
						<UserControl>
							<Link to="/register">sign up</Link>
						</UserControl>
						<UserControl>
							<Link to="/reset">reset password</Link>
						</UserControl>
						<UserControl>
							<Link to="/change">change password</Link>
						</UserControl>
						<UserControl>
							<Link to="/confirm">confirm e-mail</Link>
						</UserControl>
						<UserControl>
							<Link to="/">log out</Link>
						</UserControl>

						<NavLink>
							<Link to="/">home</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/quickstart">quickstart</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard">dashboard</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/settings/general">
								general settings
							</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/settings/data">
								tracked data
							</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/logs">logs</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/resources">
								server resourses
							</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/http">http</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/websockets">websockets</Link>
						</NavLink>
					</Nav>
				</NavAside>

				<Main>
					<ContentHeader>Quick Start</ContentHeader>
					<Greeting>Welcome, {'User'}!</Greeting>
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
						Add to <Code>devDependencies</Code>,{' '}
						<Code>peerDependencies</Code>, and{' '}
						<Code>optionalDependencies</Code> respectively:
					</ContentBlock>
					<Pre>
						<Code>
							yarn add observer --dev&nbsp;
							<br />
							&nbsp;yarn add observer --peer&nbsp;
							<br />
							&nbsp;yarn add observer --optional
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
							const logconnect =
							require("observer").logconnect;&nbsp;
							<br />
							<br />
							&nbsp;... <i>(your code here)</i>
							&nbsp;
							<br />
							<br />
							&nbsp;app.use(logconnect);
						</Code>
					</Pre>
					<ContentBlock>
						Then create on your server one more app, that contains
						only index.js:
					</ContentBlock>
					<Pre>
						<Code>
							const logcollect =
							require("observer").logcollect;&nbsp;
							<br />
							&nbsp;logcollect.start("8080", &#123;&nbsp;
							<br />
							&#9;...options, <br />
							&nbsp; &#9;token:&nbsp;
							"123af12345b1a12345a6aa1234e123456ae1234b"&nbsp;
							<br />
							&nbsp;})
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
							yarn upgrade observer&nbsp;
							<br />
							&nbsp;yarn upgrade observer@[version]&nbsp;
							<br />
							&nbsp;yarn upgrade observer@[tag]
						</Code>
					</Pre>
				</Main>
			</React.Fragment>
		);
	}
}

export default Quickstart;
