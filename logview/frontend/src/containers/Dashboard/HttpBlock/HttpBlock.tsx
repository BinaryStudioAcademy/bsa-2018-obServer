import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HttpRoutesBarChart from '../../../components/charts/http/routesChart';
import HttpCountChart from '../../../components/charts/http/countHttpChart';
import {
	ChartHeader,
	ChartWrapper,
	Chart,
	RefreshButton
} from '../../HttpStats/HttpStatsStyles';
import { Grid, HttpContainer, Title } from './HttpBlockStyles';
import { Submit } from '../../../styles/Styles';
import { Link } from 'react-router-dom';
import NoApps from '../../../components/noData/NoApps';
import NoActiveApps from '../../../components/noData/NoActiveApp';
import NoStatsData from '../../../components/noData/NoStatsData';
import LogsUpdateTimer from '../../../components/UpdateTimer/LogsUpdateTimer';
import { getNewHttpStats } from '../../../redux/logs/actions';
import { FiltersState } from '../../../types/LogsState';
import { AppsState } from '../../../types/AppsState';
import {
	countHttpParser,
	countRoutesParser,
	convertTimeRangeToInterval
} from '../../../services/chartParser';
import { LoaderBars } from '../../../components/loaders';
import { SyncAlt } from 'styled-icons/fa-solid';

interface HttpStatsProps {
	actions: { getNewHttpStats: Function };
	httpStats: Array<HttpStatsState>;
	fetchingLogsStatus: string;
	filters: FiltersState;
	apps: Array<AppsState>;
}

interface HttpStatsState {}

class HttpStats extends React.Component<HttpStatsProps, HttpStatsState> {
	constructor(props: HttpStatsProps) {
		super(props);
		this.refresh = this.refresh.bind(this);
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
						nextProps.filters.timeRanges.requests
					)
				);
		}
	}

	refresh() {
		const activeApp = this.props.filters.activeApp;
		activeApp &&
			this.props.actions.getNewHttpStats(
				activeApp.value,
				convertTimeRangeToInterval(
					this.props.filters.timeRanges.requests
				)
			);
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
					<Submit>
						<Link to="/dashboard/httpstats">open http stats</Link>
					</Submit>
				</HttpContainer>
			);
		} else if (this.props.httpStats.length === 0) {
			return (
				<HttpContainer>
					<Title>Http Stats</Title>
					<NoStatsData />
					<Submit>
						<Link to="/dashboard/httpstats">open http stats</Link>
					</Submit>
				</HttpContainer>
			);
		} else {
			return (
				<HttpContainer>
					<Title>
						Http Stats
						<RefreshButton onClick={this.refresh}>
							<SyncAlt size={22} />
						</RefreshButton>
					</Title>
					{this.props.fetchingLogsStatus === 'success' ? (
						<Grid>
							<ChartWrapper>
								<Chart>
									<ChartHeader>
										<h3>Request Count</h3>
										<LogsUpdateTimer
											caller="requests"
											activeInterval={
												this.props.filters.timeRanges
													.requests
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
												this.props.filters.timeRanges
													.requests
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
					) : (
						<LoaderBars />
					)}
					<br />
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
	actions: bindActionCreators({ getNewHttpStats }, dispatch)
});

const HttpStatsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(HttpStats);

export default HttpStatsConnected;
