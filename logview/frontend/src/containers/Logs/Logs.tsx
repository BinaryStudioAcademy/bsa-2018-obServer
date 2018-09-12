import * as React from 'react';
// components & their styles
import LevelsSelect from 'src/components/LevelsSelect/LevelsSelect';
import LogsUpdateTimer from 'src/components/UpdateTimer/LogsUpdateTimer';
import ErrChart from 'src/components/charts/logs/ErrChart';
import LogStatsTabel from '../../components/tabels/logStatsTabel';
import { LoaderBars } from 'src/components/loaders';
import { Autorenew } from 'styled-icons/material';
import { Submit } from 'src/styles/Styles';
import { RowContainer } from 'src/containers/Dashboard/DashboardStyles';
// import { SelectChartPage } from '../../styles/Styles';
import {
	ChartWrapper,
	ChartHeader,
	LogsSearchForm
} from 'src/styles/LogsStyles';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLogMessages } from 'src/redux/logs/actions';
import { LogMessagesState, FiltersState } from '../../types/LogsState';

// data & services
import { filterLogs, calcErrStats } from '../../services/logstats/logs';

interface LogsProps {
	actions: {
		getLogMessages: Function;
	};
	user: { companyId: string };
	fetchingUserStatus: string;
	fetchingLogsStatus: string;
	logMessages: Array<LogMessagesState>;
	filters: FiltersState;
}

interface LogsState {}

class Logs extends React.Component<LogsProps, LogsState> {
	constructor(props: LogsProps) {
		super(props);
	}

	componentDidMount() {
		if (this.props.user.companyId) {
			this.props.actions.getLogMessages(this.props.user.companyId);
		}
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.user.companyId &&
			this.props.user.companyId !== prevProps.user.companyId
		) {
			this.props.actions.getLogMessages(this.props.user.companyId);
		}
	}

	render() {
		return (
			<React.Fragment>
				<ChartWrapper>
					<ChartHeader>
						<h3>Errors Statistics</h3>
						<LogsUpdateTimer
							caller="errStats"
							activeInterval={
								this.props.filters.timeRanges.errStats
							}
						/>
					</ChartHeader>
					{this.props.fetchingLogsStatus === 'success' ? (
						<ErrChart
							data={calcErrStats(this.props.logMessages, {
								activeApp: this.props.filters.activeApp,
								timeRange: this.props.filters.timeRanges
									.errStats
							})}
							timeRange={this.props.filters.timeRanges.errStats}
						/>
					) : (
						<LoaderBars />
					)}
				</ChartWrapper>
				<LogsSearchForm>
					<Submit
						onClick={e => {
							e.preventDefault();
							this.props.actions.getLogMessages(
								this.props.user.companyId
							);
						}}
						style={{ margin: '0px' }}
					>
						<RowContainer>
							<Autorenew size="20px" />
							<span> fetch new logs</span>
						</RowContainer>
					</Submit>
					<LevelsSelect />
					<LogsUpdateTimer
						activeInterval={this.props.filters.timeRanges.logs}
						caller="logs"
					/>
				</LogsSearchForm>
				{this.props.fetchingLogsStatus === 'success' ? (
					<LogStatsTabel
						data={filterLogs(this.props.logMessages, {
							activeApp: this.props.filters.activeApp,
							timeRange: this.props.filters.timeRanges.logs,
							logLevels: this.props.filters.logLevels
						})}
					/>
				) : (
					<LoaderBars />
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({
	user,
	fetchingLogsStatus,
	logMessages,
	filters
}) => ({
	user,
	fetchingLogsStatus,
	logMessages,
	filters
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ getLogMessages }, dispatch)
});

const LogsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Logs);

export default LogsConnected;
