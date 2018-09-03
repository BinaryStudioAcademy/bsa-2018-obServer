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
import UpdateTimer from '../../components/UpdateTimer/UpdateTimer';

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

	handleTimeRange(event) {
		this.setState({ timeRange: event.target.value });
	}

	handleActiveApp(event) {
		this.setState({ app: event.target.value });
	}

	render() {
		return (
			<React.Fragment>
				<Title>Http Stats</Title>

				<div>
					<select onChange={this.handleActiveApp}>
						<option value="app1">app1</option>
						<option value="app2">app2</option>
						<option value="app3">app4</option>
					</select>
					<select onChange={this.handleTimeRange}>
						<option value="last 10 minutes">last 10 minutes</option>
						<option value="last 30 minutes">last 30 minutes</option>
						<option value="last 1 hour">last 1 hour</option>
						<option value="last 5 hours">last 5 hours</option>
						<option value="last 12 hours">last 12 hours</option>
						<option value="last day">last day</option>
						<option value="last week">last week</option>
						<option value="last  month">last month</option>
					</select>
				</div>

				<Grid>
					<ChartWrapper>
						<Chart>
							<ChartHeader>
								<h3>Request Count</h3>
								<ChartTimeRange>
									<Timer size="24" /> {this.state.timeRange}
								</ChartTimeRange>
							</ChartHeader>
							<UpdateTimer />
							<HttpCountChart
								data={countHttp}
								timeRange={this.state.timeRange}
							/>
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
