import * as React from 'react';
import { NoDataWrapper, NoDataTitle } from '../../styles/NoDataStyles';

class NoActiveApps extends React.Component {
	render() {
		return (
			<NoDataWrapper>
				<NoDataTitle>Please select the app!</NoDataTitle>
			</NoDataWrapper>
		);
	}
}

export default NoActiveApps;
