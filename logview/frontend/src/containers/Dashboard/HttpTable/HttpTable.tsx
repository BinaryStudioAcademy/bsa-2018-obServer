import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TableWrapper } from '../../HttpStats/HttpStatsStyles';
import { HttpContainer, Title } from '../HttpBlock/HttpBlockStyles';
import { Submit } from '../../../styles/Styles';
import { Link } from 'react-router-dom';
import NoApps from '../../../components/noData/NoApps';
import NoActiveApps from '../../../components/noData/NoActiveApp';
import NoStatsData from '../../../components/noData/NoStatsData';
import { getNewHttpStats } from '../../../redux/logs/actions';
import { FiltersState } from '../../../types/LogsState';
import { AppsState } from '../../../types/AppsState';
import {
	httpParser,
	convertTimeRangeToInterval
} from '../../../services/chartParser';
import { LoaderBars } from '../../../components/loaders';
import HttpTableDemo from 'src/components/tabels/httpTableDemo';

interface HttpStatsProps {
	actions: { getNewHttpStats: Function };
	httpStats: Array<HttpStatsState>;
	fetchingLogsStatus: string;
	filters: FiltersState;
	apps: Array<AppsState>;
}

interface HttpStatsState {}

class HttpTable extends React.Component<HttpStatsProps, HttpStatsState> {
	constructor(props: HttpStatsProps) {
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
				<HttpContainer>
					<Title>Http Stats Table</Title>
					<NoApps />
				</HttpContainer>
			);
		} else if (!this.props.filters.activeApp) {
			return (
				<HttpContainer>
					<Title>Http Stats Table</Title>
					<NoActiveApps />
					<Submit>
						<Link to="/dashboard/httpstats">open http stats</Link>
					</Submit>
				</HttpContainer>
			);
		} else if (this.props.httpStats.length === 0) {
			return (
				<HttpContainer>
					<Title>Http Stats Table</Title>
					<NoStatsData />
					<Submit>
						<Link to="/dashboard/httpstats">open http stats</Link>
					</Submit>
				</HttpContainer>
			);
		} else {
			return this.props.fetchingLogsStatus === 'success' ? (
				<HttpContainer>
					<Title>Http Stats Table</Title>
					<TableWrapper>
						<HttpTableDemo
							data={httpParser(this.props.httpStats)}
						/>
					</TableWrapper>
					<br />
					<Submit>
						<Link to="/dashboard/httpstats">open http stats</Link>
					</Submit>
				</HttpContainer>
			) : (
				<LoaderBars />
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

const HttpTableConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(HttpTable);

export default HttpTableConnected;
