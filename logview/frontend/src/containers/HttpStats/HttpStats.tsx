import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HttpTabel from '../../components/tabels/httpTabel';
import HttpRoutesBarChart from '../../components/charts/http/routesChart';
import HttpCountChart from '../../components/charts/http/countHttpChart';
import { HttpStatsState } from '../../types/LogsState';
import { getNewHttpStats, handleTimeRange } from '../../redux/logs/actions';
import {
	ChartHeader,
	Grid,
	ChartWrapper,
	Title,
	Chart
} from './HttpStatsStyles';
import { LoaderBars } from 'src/components/loaders';
import {
	countHttpParser,
	countRoutesParser,
	httpParser,
	convertTimeRangeToInterval
} from 'src/services/chartParser';
import { FiltersState } from '../../types/LogsState';
import { AppsState } from 'src/types/AppsState';
import UpdateTimer from 'src/components/UpdateTimer/UpdateTimer';
import NoApps from 'src/components/noData/NoApps';
import NoActiveApps from 'src/components/noData/NoActiveApp';
import NoStatsData from 'src/components/noData/NoStatsData';

interface HttpProps {
	actions: { getNewHttpStats: Function; handleTimeRange: Function };
	httpStats: Array<HttpStatsState>;
	fetchingLogsStatus: string;
	filters: FiltersState;
	apps: Array<AppsState>;
}

interface HttpState {}

class HttpStats extends React.Component<HttpProps, HttpState> {
	constructor(props: HttpProps) {
		super(props);
		this.onActiveTimeRange = this.onActiveTimeRange.bind(this);
	}

	componentDidMount() {
		const activeApp = this.props.filters.activeApp;
		activeApp &&
			this.props.actions.getNewHttpStats(
				activeApp.value,
				convertTimeRangeToInterval(this.props.filters.timeRange)
			);
	}

	onActiveTimeRange(value) {
		const activeApp = this.props.filters.activeApp;
		this.props.actions.handleTimeRange(value);
		activeApp &&
			this.props.actions.getNewHttpStats(
				activeApp.value,
				convertTimeRangeToInterval(this.props.filters.timeRange)
			);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.filters.activeApp !== this.props.filters.activeApp) {
			const activeApp = nextProps.filters.activeApp;
			activeApp &&
				this.props.actions.getNewHttpStats(
					activeApp.value,
					convertTimeRangeToInterval(this.props.filters.timeRange)
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
											<UpdateTimer
												active={
													this.props.filters.timeRange
												}
												onActive={
													this.onActiveTimeRange
												}
											/>
										</ChartHeader>
										<HttpCountChart
											data={countHttpParser(
												this.props.httpStats,
												this.props.filters.timeRange
											)}
											timeRange={
												this.props.filters.timeRange
											}
										/>
									</Chart>
								</ChartWrapper>
								<ChartWrapper>
									<Chart>
										<ChartHeader>
											<h3>Routes Count</h3>
											<UpdateTimer
												active={
													this.props.filters.timeRange
												}
												onActive={
													this.onActiveTimeRange
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
	actions: bindActionCreators({ getNewHttpStats, handleTimeRange }, dispatch)
});

const HttpStatsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(HttpStats);

export default HttpStatsConnected;
