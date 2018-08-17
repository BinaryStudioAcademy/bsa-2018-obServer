import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	Building,
	ChartBar,
	ClipboardList,
	Filter,
	Globe,
	Memory,
	Rocket,
	Server,
	Tasks,
	Terminal,
	UserCog,
	UserShield
} from 'styled-icons/fa-solid';
import {
	Dashboard,
	Http,
	NotificationsActive,
	Person,
	PowerSettingsNew,
	Settings,
	SettingsInputHdmi,
	Timer
} from 'styled-icons/material';
import { Activity, Cpu } from 'styled-icons/feather';
import {
	NavAside,
	Nav,
	UserInfo,
	NavLink,
	SubLinkUl,
	SubLink,
	UserControl,
	Main,
	ContentHeader,
	ContentSubheader,
	ContentBlock,
	Pre,
	Code,
	Greeting,
	Span
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
						<Building size="20" />
						{` CompanyName`}
						<hr />
						<Person size="24" />
						{` UserName`}
					</UserInfo>
					<Nav>
						<UserControl>
							<Link to="/">
								<PowerSettingsNew size="24px" />
								<Span> log out</Span>
							</Link>
						</UserControl>

						<NavLink>
							<Link to="/dashboard">
								<Dashboard size="24" />
								<Span> dashboard</Span>
							</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/quickstart">
								<Rocket size="24px" />
								<Span> quickstart</Span>
							</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/quickstart">
								<Settings size="24" />
								<Span> general settings</Span>
								<SubLinkUl>
									<SubLink>
										<Link to="/dashboard/settings/data">
											<br />
											<UserCog size="200px" />
											<br />
											<Span>user settings</Span>
										</Link>
									</SubLink>
									<SubLink>
										<Link to="/dashboard/settings/data">
											<br />
											<UserShield size="200px" />
											<br />
											<Span>credentials settings</Span>
										</Link>
									</SubLink>
									<SubLink>
										<Link to="/dashboard/settings/data">
											<br />
											<NotificationsActive size="200px" />
											<br />
											<Span>notification settings</Span>
										</Link>
									</SubLink>
								</SubLinkUl>
							</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/quickstart">
								<Activity size="24px" />
								<Span> tracked data</Span>
								<SubLinkUl>
									<SubLink>
										<Link to="/dashboard/settings/data">
											<br />
											<Tasks size="200px" />
											<br />
											<Span>tracked data settings</Span>
										</Link>
									</SubLink>
									<SubLink>
										<Link to="/dashboard/settings/data">
											<br />
											<Globe size="200px" />
											<br />
											<Span>tracked data ports</Span>
										</Link>
									</SubLink>
								</SubLinkUl>
							</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/quickstart">
								<ClipboardList size="24px" />
								<Span> logs</Span>
								<SubLinkUl>
									<SubLink>
										<Link to="/dashboard/logs">
											<br />
											<Filter size="200px" />
											<br />
											<Span>logs filter</Span>
										</Link>
									</SubLink>
									<SubLink>
										<Link to="/dashboard/logs">
											<br />
											<Terminal size="200px" />
											<br />
											<Span>logs terminal</Span>
										</Link>
									</SubLink>
								</SubLinkUl>
							</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/quickstart">
								<Server size="24px" />
								<Span> server resourses</Span>
								<SubLinkUl>
									<SubLink>
										<Link to="/dashboard/resources">
											<br />
											<Cpu size="200px" />
											<br />
											<Span>cpu usage</Span>
										</Link>
									</SubLink>
									<SubLink>
										<Link to="/dashboard/resources">
											<br />
											<Memory size="200px" />
											<br />
											<Span>memory usage</Span>
										</Link>
									</SubLink>
								</SubLinkUl>
							</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/quickstart">
								<Http size="24px" />
								<Span> http</Span>
								<SubLinkUl>
									<SubLink>
										<Link to="/dashboard/http">
											<br />
											<ChartBar size="200px" />
											<br />
											<Span>average amount</Span>
										</Link>
									</SubLink>
									<SubLink>
										<Link to="/dashboard/http">
											<br />
											<Timer size="200px" />
											<br />
											<Span>response time</Span>
										</Link>
									</SubLink>
								</SubLinkUl>
							</Link>
						</NavLink>
						<NavLink>
							<Link to="/dashboard/quickstart">
								<SettingsInputHdmi size="24px" />
								<Span> websockets</Span>
								<SubLinkUl>
									<SubLink>
										<Link to="/dashboard/websockets">
											<br />
											<ChartBar size="200px" />
											<br />
											<Span>average amount</Span>
										</Link>
									</SubLink>
									<SubLink>
										<Link to="/dashboard/websockets">
											<br />
											<Timer size="200px" />
											<br />
											<Span>response time</Span>
										</Link>
									</SubLink>
								</SubLinkUl>
							</Link>
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
