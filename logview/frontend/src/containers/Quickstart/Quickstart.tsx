import * as React from 'react';
import {
	ContentBlock,
	Greeting,
	ContentSubheader,
	Pre,
	Code
} from '../../styles/QuickstartStyles';
import { Title } from '../../styles/Styles';

class Quickstart extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Title>Quick Start</Title>
				<div>&nbsp;</div>
				<ContentBlock>
					Now that you have registered, you can start using Observer.
					Here are some of the most common commands you’ll need.
				</ContentBlock>
				<ContentSubheader>
					Adding observer as dependency into your project
				</ContentSubheader>
				<ContentBlock>
					Our logcollect and logconnect applications are included in
					observer npm package. To add them into your project, do the
					following:
				</ContentBlock>
				<Pre>
					<Code>&nbsp;yarn add observer</Code>
				</Pre>
				<ContentSubheader>
					Adding observer to different categories of dependencies
				</ContentSubheader>
				<ContentBlock>
					Add to devDependencies, peerDependencies, and{' '}
					optionalDependencies respectively:
				</ContentBlock>
				<Pre>
					<Code>
						&nbsp;yarn add observer --dev&nbsp;
						<br />
						&nbsp;yarn add observer --peer&nbsp;
						<br />
						&nbsp;yarn add observer --optional
					</Code>
				</Pre>
				<ContentSubheader>Using observer in your code</ContentSubheader>
				<ContentBlock>
					In your express.js application add into index.js:
				</ContentBlock>
				<Pre>
					<Code>
						&nbsp;const logconnect =
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
					Then create on your server one more app, that contains only
					index.js:
				</ContentBlock>
				<Pre>
					<Code>
						&nbsp;const logcollect =
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
					Several logconnect apps send data to logcollect (port :8080
					in this case) and logcollect sends token (which serves as
					id) to database.
				</ContentBlock>
				<ContentSubheader>Upgrading observer</ContentSubheader>
				<Pre>
					<Code>
						&nbsp;yarn upgrade observer&nbsp;
						<br />
						&nbsp;yarn upgrade observer@[version]&nbsp;
						<br />
						&nbsp;yarn upgrade observer@[tag]
					</Code>
				</Pre>
			</React.Fragment>
		);
	}
}

export default Quickstart;
