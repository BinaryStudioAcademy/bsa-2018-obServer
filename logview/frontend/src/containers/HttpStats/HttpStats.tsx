import * as React from 'react';
import HttpTabel from '../../components/tabels/httpTabel';
import HttpRoutesBarChart from '../../components/charts/http/routesChart';
import HttpCountChart from '../../components/charts/http/countHttpChart';
import {
	ChartHeader,
	ChartGridTwo,
	ChartWrapper,
	ChartTimeRange
} from '../../styles/Styles';
import { Timer } from 'styled-icons/material';
import { httpStats, countRoutes, countHttp } from './mockData';

class HttpStats extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h1>
					Http Stats
					<select>
						<option>last 10 minutes</option>
						<option>last 30 minutes</option>
						<option>last 12 hours</option>
						<option>last 1 day</option>
						<option>last 1 week</option>
						<option>last 1 month</option>
					</select>
				</h1>
				<ChartGridTwo>
					<ChartWrapper>
						<ChartHeader>
							<h3>Request Count</h3>
							<ChartTimeRange>
								<Timer size="24" /> last 10 minutes
							</ChartTimeRange>
						</ChartHeader>
						<HttpCountChart data={countHttp} />
					</ChartWrapper>
					<ChartWrapper>
						<ChartHeader>
							<h3>Routes Count</h3>
							<ChartTimeRange>
								<Timer size="24" /> last 10 minutes
							</ChartTimeRange>
						</ChartHeader>
						<HttpRoutesBarChart data={countRoutes} />
					</ChartWrapper>
				</ChartGridTwo>

				<HttpTabel data={httpStats} />
			</React.Fragment>
		);
	}
}

export default HttpStats;
