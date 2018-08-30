import * as React from 'react';
import HttpTabel from '../../components/tabels/httpTabel';
import HttpRoutesBarChart from '../../components/charts/http/routesChart';
import HttpCountChart from '../../components/charts/http/countHttpChart';
import {
	ChartHeader,
	Grid,
	ChartWrapper,
	ChartTimeRange,
	Title,
	Chart
} from './HttpStatsStyles';
import { Timer } from 'styled-icons/material';
import { httpStats, countRoutes, countHttp } from './mockData';
import Select from 'src/components/Select/Select';

interface HttpStatsProps {}

interface HttpStatsState {
	timeRange: string;
	app: string;
}

class HttpStats extends React.Component<HttpStatsProps, HttpStatsState> {
	constructor(props: HttpStatsProps) {
		super(props);

		this.state = {
			timeRange: 'last 10 minutes',
			app: 'app1'
		};

		this.handleTimeRange = this.handleTimeRange.bind(this);
	}

	handleTimeRange(activeTimeRange) {
		this.setState({ timeRange: activeTimeRange });
	}

	handleActiveApp(activeApp) {
		this.setState({ app: activeApp });
	}

	render() {
		return (
			<React.Fragment>
				<Title>Http Stats</Title>
				<Grid>
					<div>
						<Select
							onActive={this.handleActiveApp}
							options={['app1', 'app2', 'app3']}
						/>
					</div>
					<div>
						<Select
							onActive={this.handleTimeRange}
							options={[
								'last 10 minutes',
								'last 30 minutes',
								'last 12 hours',
								'last 1 day',
								'last 1 week',
								'last 1 month'
							]}
						/>
					</div>
				</Grid>

				<Grid style={{ marginTop: '100px' }}>
					<ChartWrapper>
						<Chart>
							<ChartHeader>
								<h3>Request Count</h3>
								<ChartTimeRange>
									<Timer size="24" /> {this.state.timeRange}
								</ChartTimeRange>
							</ChartHeader>
							<HttpCountChart data={countHttp} />
						</Chart>
					</ChartWrapper>
					<ChartWrapper>
						<Chart>
							<ChartHeader>
								<h3>Routes Count</h3>
								<ChartTimeRange>
									<Timer size="24" /> {this.state.timeRange}
								</ChartTimeRange>
							</ChartHeader>
							<HttpRoutesBarChart data={countRoutes} />
						</Chart>
					</ChartWrapper>
				</Grid>

				<HttpTabel data={httpStats} />
			</React.Fragment>
		);
	}
}

export default HttpStats;
