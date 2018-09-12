import * as React from 'react';
import { Link } from 'react-router-dom';
import { PlusSquare } from 'styled-icons/fa-solid';
import {
	NoDataButton,
	NoDataWrapper,
	NoDataTitle
} from 'src/styles/NoDataStyles';

class NoApps extends React.Component {
	render() {
		return (
			<NoDataWrapper>
				<NoDataTitle>
					You have not connected any apps on your server!
				</NoDataTitle>
				<Link to="/dashboard/settings/server">
					<NoDataButton>
						<PlusSquare size="24" />
						ADD NEW APP
					</NoDataButton>
				</Link>
			</NoDataWrapper>
		);
	}
}

export default NoApps;
