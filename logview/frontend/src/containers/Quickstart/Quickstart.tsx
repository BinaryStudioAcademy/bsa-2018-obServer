import * as React from 'react';
import {
	ContentBlock,
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
					Adding observer-bsa as dependency into your project
				</ContentSubheader>
				<ContentBlock>
					Our logcollect and logconnect applications are included in
					observer npm package. To add them into your project, do the
					following:
				</ContentBlock>
				<Pre>
					<Code>&nbsp;yarn add observer-bsa</Code>
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
						&nbsp;yarn add observer-bsa --dev&nbsp;
						<br />
						&nbsp;yarn add observer-bsa --peer&nbsp;
						<br />
						&nbsp;yarn add observer-bsa --optional
					</Code>
				</Pre>
				<ContentSubheader>Using observer in your code</ContentSubheader>
				<ContentBlock>
					In your application add into index.js:
				</ContentBlock>
				<Pre>
					<Code>
						&nbsp;const observer =
						require("observer-bsa")(logcollectPort, appId);&nbsp;
						<br />
						<br />
						&nbsp;... <i>(your code here)</i>
						&nbsp;
						<br />
						<br />
						&nbsp;app.use(observer.httpStats()); // http statistic
						for your Express.js app
						&nbsp;obServer.logger().error('some error'); // error
						log
					</Code>
				</Pre>
				<ContentBlock>
					Then create on your server one more app, that contains only
					index.js:
				</ContentBlock>
				<Pre>
					<Code>
						&nbsp;require("observer-bsa/logcollect")(logcollectPort,
						companyId);&nbsp;
					</Code>
				</Pre>
				<ContentBlock>
					Several logconnect apps send data to logcollect (port 3100
					in this case).
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
