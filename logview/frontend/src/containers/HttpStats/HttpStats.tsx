import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HttpTabel from '../../components/tabels/httpTable';
import HttpRoutesBarChart from '../../components/charts/http/routesChart';
import HttpCountChart from '../../components/charts/http/countHttpChart';
import { HttpStatsState } from '../../types/LogsState';
import { getNewHttpStats } from '../../redux/logs/actions';
import {
	ChartHeader,
	Grid,
	ChartWrapper,
	Title,
	Chart
} from './HttpStatsStyles';
import { LoaderBars } from '../../components/loaders';
import {
	countHttpParser,
	countRoutesParser,
	httpParser,
	convertTimeRangeToInterval
} from '../../services/chartParser';
import { FiltersState } from '../../types/LogsState';
import { AppsState } from '../../types/AppsState';
import LogsUpdateTimer from '../../components/UpdateTimer/LogsUpdateTimer';
import NoApps from '../../components/noData/NoApps';
import NoActiveApps from '../../components/noData/NoActiveApp';
import NoStatsData from '../../components/noData/NoStatsData';

interface HttpProps {
	actions: { getNewHttpStats: Function };
	httpStats: Array<HttpStatsState>;
	fetchingLogsStatus: string;
	filters: FiltersState;
	apps: Array<AppsState>;
}

interface HttpState {}

class HttpStats extends React.Component<HttpProps, HttpState> {
	constructor(props: HttpProps) {
		super(props);
	}

	componentDidMount() {
		const activeApp = this.props.filters.activeApp;
		activeApp &&
			this.props.actions.getNewHttpStats(
				activeApp.value,
				convertTimeRangeToInterval(
					this.props.filters.timeRanges.requests
				)
			);
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.filters.activeApp !== this.props.filters.activeApp ||
			nextProps.filters.timeRanges.requests !==
				this.props.filters.timeRanges.requests
		) {
			const activeApp = nextProps.filters.activeApp;
			activeApp &&
				this.props.actions.getNewHttpStats(
					activeApp.value,
					convertTimeRangeToInterval(
						this.props.filters.timeRanges.requests
					)
				);
		}
	}

	render() {
		if (!this.props.apps) {
			return (
				<React.Fragment>
					<Title>Http Stats</Title>
					<NoApps />
				</React.Fragment>
			);
		} else if (!this.props.filters.activeApp) {
			return (
				<React.Fragment>
					<Title>Http Stats</Title>
					<NoActiveApps />
				</React.Fragment>
			);
		} else if (this.props.httpStats.length === 0) {
			return (
				<React.Fragment>
					<Title>Http Stats</Title>
					<NoStatsData />
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<Title>Http Stats</Title>
					{this.props.fetchingLogsStatus === 'success' ? (
						<div>
							<Grid>
								<ChartWrapper>
									<Chart>
										<ChartHeader>
											<h3>Request Count</h3>
											<LogsUpdateTimer
												caller="requests"
												activeInterval={
													this.props.filters
														.timeRanges.requests
												}
											/>
										</ChartHeader>
										<HttpCountChart
											data={countHttpParser(
												this.props.httpStats,
												this.props.filters.timeRanges
													.requests
											)}
											timeRange={
												this.props.filters.timeRanges
													.requests
											}
										/>
									</Chart>
								</ChartWrapper>
								<ChartWrapper>
									<Chart>
										<ChartHeader>
											<h3>Routes Count</h3>
											<LogsUpdateTimer
												caller="requests"
												activeInterval={
													this.props.filters
														.timeRanges.requests
												}
											/>
										</ChartHeader>
										<HttpRoutesBarChart
											data={countRoutesParser(
												this.props.httpStats
											)}
										/>
									</Chart>
								</ChartWrapper>
							</Grid>
							<HttpTabel
								data={httpParser(this.props.httpStats)}
							/>
						</div>
					) : (
						<LoaderBars />
					)}
				</React.Fragment>
			);
		}
	}
}

const mapStateToProps = ({ httpStats, fetchingLogsStatus, filters, apps }) => ({
	httpStats,
	fetchingLogsStatus,
	filters,
	apps
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ getNewHttpStats }, dispatch)
});

const HttpStatsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(HttpStats);

export default HttpStatsConnected;
