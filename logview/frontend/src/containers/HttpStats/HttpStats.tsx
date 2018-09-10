import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HttpTabel from '../../components/tabels/httpTabel';
import HttpRoutesBarChart from '../../components/charts/http/routesChart';
import HttpCountChart from '../../components/charts/http/countHttpChart';
import { HttpStatsState } from '../../types/LogsState';
import { getNewHttpStats } from '../../redux/logs/actions';
import {
	ChartHeader,
	Grid,
	ChartWrapper,
	ChartTimeRange,
	Title,
	Chart,
	SelectChartPage
} from './HttpStatsStyles';
import { Timer } from 'styled-icons/material';
import { LoaderBars } from 'src/components/loaders';
import {
	countHttpParser,
	countRoutesParser,
	httpParser,
	convertTimeRangeToInterval
} from 'src/services/chartParser';

interface HttpProps {
	actions: { getNewHttpStats: Function };
	httpStats: Array<HttpStatsState>;
	fetchingLogsStatus: string;
}

interface HttpState {
	timeRange: string;
	appId: string;
}

class HttpStats extends React.Component<HttpProps, HttpState> {
	constructor(props: HttpProps) {
		super(props);

		this.state = {
			timeRange: 'last 10 minutes',
			appId: 'MyAppId'
		};

		this.handleTimeRange = this.handleTimeRange.bind(this);
		this.handleActiveApp = this.handleActiveApp.bind(this);
	}

	componentDidMount() {
		this.props.actions.getNewHttpStats(
			this.state.appId,
			convertTimeRangeToInterval(this.state.timeRange)
		);
	}

	handleTimeRange(event) {
		this.setState({ timeRange: event.target.value });
		this.props.actions.getNewHttpStats(
			this.state.appId,
			convertTimeRangeToInterval(event.target.value)
		);
	}

	handleActiveApp(event) {
		this.setState({ appId: event.target.value });
		this.props.actions.getNewHttpStats(
			event.target.value,
			convertTimeRangeToInterval(this.state.timeRange)
		);
	}

	render() {
		return (
			<React.Fragment>
				<Title>Http Stats</Title>

				<div>
					<SelectChartPage onChange={this.handleActiveApp}>
						<option value="MyAppId">app1</option>
						<option value="MyAppId">app2</option>
						<option value="MyAppId">app4</option>
					</SelectChartPage>
					<SelectChartPage onChange={this.handleTimeRange}>
						<option value="last 10 minutes">last 10 minutes</option>
						<option value="last 30 minutes">last 30 minutes</option>
						<option value="last 1 hour">last 1 hour</option>
						<option value="last 3 hours">last 3 hours</option>
						<option value="last 5 hours">last 5 hours</option>
						<option value="last 12 hours">last 12 hours</option>
						<option value="last day">last day</option>
						<option value="last week">last week</option>
						<option value="last  month">last month</option>
					</SelectChartPage>
				</div>
				{this.props.httpStats.length > 0 &&
				this.props.fetchingLogsStatus === 'success' ? (
					<div>
						<Grid>
							<ChartWrapper>
								<Chart>
									<ChartHeader>
										<h3>Request Count</h3>
										<ChartTimeRange>
											<Timer size="24" />{' '}
											{this.state.timeRange}
										</ChartTimeRange>
									</ChartHeader>
									<HttpCountChart
										data={countHttpParser(
											this.props.httpStats,
											this.state.timeRange
										)}
										timeRange={this.state.timeRange}
									/>
								</Chart>
							</ChartWrapper>
							<ChartWrapper>
								<Chart>
									<ChartHeader>
										<h3>Routes Count</h3>
										<ChartTimeRange>
											<Timer size="24" />{' '}
											{this.state.timeRange}
										</ChartTimeRange>
									</ChartHeader>
									<HttpRoutesBarChart
										data={countRoutesParser(
											this.props.httpStats
										)}
									/>
								</Chart>
							</ChartWrapper>
						</Grid>
						<HttpTabel data={httpParser(this.props.httpStats)} />
					</div>
				) : (
					<LoaderBars />
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ httpStats, fetchingLogsStatus }) => ({
	httpStats,
	fetchingLogsStatus
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ getNewHttpStats }, dispatch)
});

const HttpStatsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(HttpStats);

export default HttpStatsConnected;
