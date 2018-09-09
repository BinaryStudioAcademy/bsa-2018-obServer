import * as React from 'react';
// components & their styles
import ErrChart from '../../components/charts/logs/ErrChart';
import LogStatsTabel from '../../components/tabels/logStatsTabel';
import { LoaderBars } from '../../components/loaders';
import { SelectChartPage } from '../../styles/Styles';
import {
	ChartWrapper,
	ChartHeader,
	LogsSearchForm,
	LevelPicker,
	Level,
	TimeSpanPicker,
	LogsList
} from '../../styles/LogsStyles';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	getLogMessages,
	handleActiveApp,
	handleTimeRange,
	handleLogLevels
} from 'src/redux/logs/actions';
import {
	LogMessagesState,
	LogLevelsState,
	LogErrorState
} from '../../types/LogsState';

// data & services
import { filterLogs, calcErrStats } from '../../services/logstats/logs';

interface LogsProps {
	actions: {
		getLogMessages: Function;
		handleActiveApp: Function;
		handleTimeRange: Function;
		handleLogLevels: Function;
	};
	user: { companyId: string };
	fetchingUserStatus: string;
	fetchingLogsStatus: string;
	logMessages: Array<LogMessagesState>;
	activeApp: string;
	timeRange: string;
	logLevels: LogLevelsState;
}

interface LogsState {
	filters: {
		levels: LogLevelsState;
		timespan: string;
	};
	filteredLogs: Array<LogMessagesState>;
	errStats: Array<LogErrorState>;
}

class Logs extends React.Component<LogsProps, LogsState> {
	constructor(props: LogsProps) {
		super(props);

		this.state = {
			filters: {
				levels: {
					error: true,
					warn: true,
					info: true,
					verbose: false,
					debug: false,
					silly: false
				},
				timespan: 'last 10 minutes'
			},
			filteredLogs: [],
			errStats: [{ timestamp: Date.now(), errors: 0 }]
		};
		this.handleLevels = this.handleLevels.bind(this);
		this.handleTimeRange = this.handleTimeRange.bind(this);
		this.handleActiveApp = this.handleActiveApp.bind(this);
	}

	componentDidMount() {
		console.log('companyId: ', this.props.user.companyId);
		this.props.actions.getLogMessages(this.props.user.companyId);
		// doesn't work correctly if try to achieve directly, with no userFetching
		// needed userFetching while login (activation)
	}

	handleLevels(e) {
		this.props.actions.handleLogLevels({
			[e.currentTarget.name]: e.currentTarget.checked
		});
	}

	handleTimeRange(e) {
		this.props.actions.handleTimeRange(e.currentTarget.value);
	}

	handleActiveApp(e) {}

	render() {
		console.log('State: ', this.state);
		return (
			<React.Fragment>
				<ChartWrapper>
					<ChartHeader>Errors Statistics</ChartHeader>
					{this.props.fetchingLogsStatus === 'success' ? (
						<ErrChart
							data={calcErrStats(
								this.props.logMessages,
								this.props.activeApp,
								this.props.timeRange
							)}
							timeRange={this.props.timeRange}
						/>
					) : (
						<LoaderBars />
					)}
				</ChartWrapper>
				<LogsSearchForm>
					<LevelPicker>
						<span>Select logs' levels</span>
						<Level>
							<input
								type="checkbox"
								name="error"
								checked={this.props.logLevels.error}
								onChange={this.handleLevels}
							/>
							Error
						</Level>
						<Level>
							<input
								type="checkbox"
								name="warn"
								checked={this.props.logLevels.warn}
								onChange={this.handleLevels}
							/>
							Warn
						</Level>
						<Level>
							<input
								type="checkbox"
								name="info"
								checked={this.props.logLevels.info}
								onChange={this.handleLevels}
							/>
							Info
						</Level>
						<Level>
							<input
								type="checkbox"
								name="verbose"
								checked={this.props.logLevels.verbose}
								onChange={this.handleLevels}
							/>
							Verbose
						</Level>
						<Level>
							<input
								type="checkbox"
								name="debug"
								checked={this.props.logLevels.debug}
								onChange={this.handleLevels}
							/>
							Debug
						</Level>
						<Level>
							<input
								type="checkbox"
								name="silly"
								checked={this.props.logLevels.silly}
								onChange={this.handleLevels}
							/>
							Silly
						</Level>
					</LevelPicker>
					<TimeSpanPicker
						name="timespan"
						value={this.props.timeRange}
						onChange={this.handleTimeRange}
					>
						<option value="last 10 minutes">last 10 minutes</option>
						<option value="last 30 minutes">last 30 minutes</option>
						<option value="last hour">last hour</option>
						<option value="last 5 hours">last 5 hours</option>
						<option value="last 12 hours">last 12 hours</option>
						<option value="last 24 hours">last 24 hours</option>
						<option value="last week">last week</option>
						<option value="last 30 days">last 30 days</option>
					</TimeSpanPicker>
				</LogsSearchForm>
				{this.props.fetchingLogsStatus === 'success' ? (
					// <LogsList>
					<LogStatsTabel
						data={filterLogs(
							this.props.logMessages,
							this.props.activeApp,
							this.props.timeRange,
							this.props.logLevels
						)}
					/>
				) : (
					// </LogsList>
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
	activeApp,
	timeRange,
	logLevels
}) => ({
	user,
	fetchingLogsStatus,
	logMessages,
	activeApp,
	timeRange,
	logLevels
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators(
		{ getLogMessages, handleActiveApp, handleTimeRange, handleLogLevels },
		dispatch
	)
});

const LogsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Logs);

export default LogsConnected;
