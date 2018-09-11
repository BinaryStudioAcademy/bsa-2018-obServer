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
import { FiltersState } from '../../types/LogsState';

interface HttpProps {
	actions: { getNewHttpStats: Function };
	httpStats: Array<HttpStatsState>;
	fetchingLogsStatus: string;
	filters: FiltersState;
}

interface HttpState {
	timeRange: string;
}

class HttpStats extends React.Component<HttpProps, HttpState> {
	constructor(props: HttpProps) {
		super(props);
		this.state = {
			timeRange: 'last 10 minutes'
		};

		this.handleTimeRange = this.handleTimeRange.bind(this);
	}

	componentDidMount() {
		const activeApp = this.props.filters.activeApp;
		activeApp &&
			this.props.actions.getNewHttpStats(
				activeApp.value,
				convertTimeRangeToInterval(this.state.timeRange)
			);
	}

	handleTimeRange(event) {
		this.setState({ timeRange: event.target.value });
		const activeApp = this.props.filters.activeApp;
		this.props.actions.getNewHttpStats(
			activeApp.value,
			convertTimeRangeToInterval(event.target.value)
		);
	}

	render() {
		return (
			<React.Fragment>
				<Title>
					Http Stats:
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
				</Title>
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

const mapStateToProps = ({ httpStats, fetchingLogsStatus, filters }) => ({
	httpStats,
	fetchingLogsStatus,
	filters
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ getNewHttpStats }, dispatch)
});

const HttpStatsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(HttpStats);

export default HttpStatsConnected;
