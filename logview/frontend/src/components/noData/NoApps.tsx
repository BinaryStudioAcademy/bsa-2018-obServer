import * as React from 'react';
import { Link } from 'react-router-dom';
import { PlusSquare } from 'styled-icons/fa-solid';

class NoApps extends React.Component {
	render() {
		//const { match } = this.props;
		return (
			<React.Fragment>
				<Link to="/dashboard/settings/server">
					<PlusSquare size="24" />
					ADD NEW APP
				</Link>
			</React.Fragment>
		);
	}
}

export default NoApps;
