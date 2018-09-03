import * as React from 'react';
import HttpTabel from '../../components/tabels/httpTabel';
import HttpRoutesBarChart from '../../components/charts/http/routesChart';
import HttpCountChart from '../../components/charts/http/countHttpChart';
import {
	ChartHeader,
	ChartWrapper,
	ChartTimeRange,
	Title,
	Chart
} from 'src/containers/HttpStats/HttpStatsStyles';
import { Timer } from 'styled-icons/material';
import { httpStats, countRoutes, countHttp } from 'src/containers/HttpStats/mockData';
import { Grid, HttpContainer } from './HttpBlockStyles';
import { Submit } from '../../styles/Styles';
import { Link } from 'react-router-dom';

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
			<HttpContainer>
				<Title>Http Stats</Title>

				<Grid>
					<ChartWrapper>
						<Chart>
							<ChartHeader>
								<h3>Request Count</h3>
								<ChartTimeRange>
									<Timer size="24" /> {this.state.timeRange}
								</ChartTimeRange>
							</ChartHeader>
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
				<Submit>
					<Link to='/dashboard/httpstats'>open http stats</Link>
				</Submit>
			</HttpContainer>
		);
	}
}

export default HttpStats;
