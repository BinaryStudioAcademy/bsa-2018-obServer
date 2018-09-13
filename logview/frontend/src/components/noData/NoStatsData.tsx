import * as React from 'react';
import { Link } from 'react-router-dom';
import { InfoCircle } from 'styled-icons/fa-solid';
import {
	NoDataButton,
	NoDataWrapper,
	NoDataTitle
} from '../../styles/NoDataStyles';

class NoStatsData extends React.Component {
	render() {
		return (
			<NoDataWrapper>
				<NoDataTitle>Sorry! No data to display!</NoDataTitle>
				<Link to="/dashboard/quickstart">
					<NoDataButton>
						<InfoCircle size="18" />
						QUICKSTART
					</NoDataButton>
				</Link>
			</NoDataWrapper>
		);
	}
}

export default NoStatsData;
