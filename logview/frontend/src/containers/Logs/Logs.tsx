import * as React from 'react';
import { Search as SearchIcon } from 'styled-icons/material';
// components & their styles
import ErrChart from 'src/components/charts/logs/ErrChart';
import LogStatsTabel from '../../components/tabels/logStatsTabel';
import { LoaderBars } from 'src/components/loaders';
import { SelectChartPage } from '../../styles/Styles';
import {
	ChartWrapper,
	ChartHeader,
	LogsSearchForm,
	LevelPicker,
	Level,
	TimeSpanPicker,
	LogsList
} from 'src/styles/LogsStyles';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLogMessages } from 'src/redux/logs/actions';
// data & services
import { filterLogs, calcErrStats } from 'src/services/logstats/logs';

interface LogsProps {
	actions: { getLogMessages: Function };
	user: { companyId: string };
	fetchingLogsStatus: string;
	logMessages: Array<{ timestamp; logLevel; message; appId }>;
}

interface LogsState {
	filters: {
		levels: { error; warn; info; verbose; debug; silly };
		timespan: string;
	};
	filteredLogs: Array<{ timestamp; logLevel; message }>;
	errStats: Array<{ timestamp; errors }>;
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
		console.log('companyId: ', this.props.user);
		this.props.actions.getLogMessages(
			'f91b35d4-b319-4204-b852-8c5ba6df0615'
		);
		// this.props.actions.getLogMessages(this.props.user.companyId);
		let nextState = {
			...this.state,
			filteredLogs: filterLogs(
				this.props.logMessages,
				this.state.filters
			),
			errStats: calcErrStats(
				this.props.logMessages,
				this.state.filters.timespan
			)
		};
		this.setState(nextState);
	}

	handleLevels(e) {
		//	this.setState({ timespan: e.currentTarget.value; })
		let nextState = {
			...this.state,
			filters: {
				...this.state.filters,
				levels: {
					...this.state.filters.levels,
					[e.currentTarget.name]: e.currentTarget.checked
				},
				filteredLogs: filterLogs(this.props.logMessages, {
					...this.state.filters,
					levels: {
						...this.state.filters.levels,
						[e.currentTarget.name]: e.currentTarget.checked
					}
				})
			}
		};
		this.setState(nextState);
	}

	handleTimeRange(e) {
		//	this.setState({ timespan: e.currentTarget.value; })
		console.log('Logs to filter: ', this.props.logMessages);
		let nextState = {
			...this.state,
			filters: {
				...this.state.filters,
				timespan: e.currentTarget.value
			},
			filteredLogs: filterLogs(this.props.logMessages, {
				...this.state.filters,
				timespan: e.currentTarget.value
			}),
			errStats: calcErrStats(
				this.props.logMessages,
				e.currentTarget.value
			) // 2: this.state.filters
		};
		console.log("Next state's logs: ", nextState.filteredLogs);
		this.setState(nextState);
	}

	handleActiveApp(e) {
		let nextState = {
			...this.state,
			filters: {
				...this.state.filters
			},
			filteredLogs: filterLogs(
				this.props.logMessages,
				this.state.filters
			),
			errStats: calcErrStats(
				this.props.logMessages,
				this.state.filters.timespan
			) // 2: this.state.filters
		};
		this.setState(nextState);
	}

	render() {
		console.log('State: ', this.state);
		return (
			<React.Fragment>
				<ChartWrapper>
					<ChartHeader>Errors Statistics</ChartHeader>
					{this.props.fetchingLogsStatus === 'success' ? (
						<ErrChart
							data={this.state.errStats}
							timeRange={this.state.filters.timespan}
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
								checked={this.state.filters.levels.error}
								onChange={this.handleLevels}
							/>
							Error
						</Level>
						<Level>
							<input
								type="checkbox"
								name="warn"
								checked={this.state.filters.levels.warn}
								onChange={this.handleLevels}
							/>
							Warn
						</Level>
						<Level>
							<input
								type="checkbox"
								name="info"
								checked={this.state.filters.levels.info}
								onChange={this.handleLevels}
							/>
							Info
						</Level>
						<Level>
							<input
								type="checkbox"
								name="verbose"
								checked={this.state.filters.levels.verbose}
								onChange={this.handleLevels}
							/>
							Verbose
						</Level>
						<Level>
							<input
								type="checkbox"
								name="debug"
								checked={this.state.filters.levels.debug}
								onChange={this.handleLevels}
							/>
							Debug
						</Level>
						<Level>
							<input
								type="checkbox"
								name="silly"
								checked={this.state.filters.levels.silly}
								onChange={this.handleLevels}
							/>
							Silly
						</Level>
					</LevelPicker>
					<TimeSpanPicker
						name="timespan"
						value={this.state.filters.timespan}
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
					<SelectChartPage onChange={this.handleActiveApp}>
						<option value="">select app</option>
						<option value="myApp1">app1</option>
						<option value="myApp2">app2</option>
						<option value="myApp3">app4</option>
					</SelectChartPage>
				</LogsSearchForm>
				{this.props.fetchingLogsStatus === 'success' ? (
					<LogsList>
						<LogStatsTabel data={this.state.filteredLogs} />
					</LogsList>
				) : (
					<LoaderBars />
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ user, fetchingLogsStatus, logMessages }) => ({
	user,
	fetchingLogsStatus,
	logMessages
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ getLogMessages }, dispatch)
});

const LogsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Logs);

export default LogsConnected;
