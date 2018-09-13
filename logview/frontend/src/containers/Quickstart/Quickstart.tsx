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
					observer-bsa npm package. To add them into your project, do the
					following:
				</ContentBlock>
				<Pre>
					<Code>&nbsp;npm install observer-bsa</Code>
				</Pre>
				<ContentSubheader>Using observer in your code</ContentSubheader>
        <ContentBlock>
          First of all you need to create logcollect app on your server, that contains only index.js:
				</ContentBlock>
				<Pre>
					<Code>
						&nbsp;require('observer-bsa/logcollect')(logcollectPort,
						companyId);<br />
            // logcollectPort - port on which your logcollect server will start<br />
            // companyId - company id from obServer account settings
					</Code>
				</Pre>
				<ContentBlock>
					Your apps will send log data to logcollect
				</ContentBlock>
				<ContentBlock>
          Adding observer-bsa as dependency into your project:
				</ContentBlock>
				<Pre>
					<Code>
						&nbsp;const observer =
						require('observer-bsa')(logcollectPort, appId);<br />
            // logcollectPort - port on which your logcollect is running<br />
            // appId - app id from obServer account settings<br />
						<br />
						&nbsp;... <i>(your code here)</i>
						&nbsp;
						<br />
						<br />
						app.use(observer.httpStats()); // http statistic for your Express.js app<br />
						obServer.logger().error('some error'); // error log
					</Code>
				</Pre>
				
				<ContentSubheader>Upgrading observer</ContentSubheader>
				<Pre>
					<Code>
						&nbsp;yarn upgrade observer-bsaA&nbsp;
						<br />
						&nbsp;yarn upgrade observer-bsa@[version]&nbsp;
						<br />
						&nbsp;yarn upgrade observer-bsa@[tag]
					</Code>
				</Pre>
			</React.Fragment>
		);
	}
}

export default Quickstart;
