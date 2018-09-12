import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HttpRoutesBarChart from '../../../components/charts/http/routesChart';
import HttpCountChart from '../../../components/charts/http/countHttpChart';
import {
	ChartHeader,
	ChartWrapper,
	Chart
} from '../../HttpStats/HttpStatsStyles';
import { Grid, HttpContainer, Title } from './HttpBlockStyles';
import { Submit } from '../../../styles/Styles';
import { Link } from 'react-router-dom';
import NoApps from 'src/components/noData/NoApps';
import NoActiveApps from 'src/components/noData/NoActiveApp';
import NoStatsData from 'src/components/noData/NoStatsData';
import UpdateTimer from 'src/components/UpdateTimer/UpdateTimer';
import { getNewHttpStats, handleTimeRange } from 'src/redux/logs/actions';
import { FiltersState } from 'src/types/LogsState';
import { AppsState } from 'src/types/AppsState';
import {
	countHttpParser,
	countRoutesParser,
	convertTimeRangeToInterval
} from 'src/services/chartParser';
import { LoaderBars } from 'src/components/loaders';

interface HttpStatsProps {
	actions: { getNewHttpStats: Function; handleTimeRange: Function };
	httpStats: Array<HttpStatsState>;
	fetchingLogsStatus: string;
	filters: FiltersState;
	apps: Array<AppsState>;
}

interface HttpStatsState {}

class HttpStats extends React.Component<HttpStatsProps, HttpStatsState> {
	constructor(props: HttpStatsProps) {
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
				<HttpContainer>
					<Title>Http Stats</Title>
					<NoApps />
				</HttpContainer>
			);
		} else if (!this.props.filters.activeApp) {
			return (
				<HttpContainer>
					<Title>Http Stats</Title>
					<NoActiveApps />
				</HttpContainer>
			);
		} else if (this.props.httpStats.length === 0) {
			return (
				<HttpContainer>
					<Title>Http Stats</Title>
					<NoStatsData />
				</HttpContainer>
			);
		} else {
			return (
				<HttpContainer>
					<Title>Http Stats</Title>
					{this.props.fetchingLogsStatus === 'success' ? (
						<Grid>
							<ChartWrapper>
								<Chart>
									<ChartHeader>
										<h3>Request Count</h3>
										<UpdateTimer
											active={
												this.props.filters.timeRange
											}
											onActive={this.onActiveTimeRange}
										/>
									</ChartHeader>
									<HttpCountChart
										data={countHttpParser(
											this.props.httpStats,
											this.props.filters.timeRange
										)}
										timeRange={this.props.filters.timeRange}
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
											onActive={this.onActiveTimeRange}
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
					) : (
						<LoaderBars />
					)}
					<Submit>
						<Link to="/dashboard/httpstats">open http stats</Link>
					</Submit>
				</HttpContainer>
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
