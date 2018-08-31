import * as React from 'react';
import { Search as SearchIcon } from 'styled-icons/material';
import ErrChart from 'src/components/charts/logs/ErrChart';

import {
	ChartWrapper,
	ChartHeader,
	LogsSearchForm,
	LevelPicker,
	Level,
	TimeSpanPicker,
	SearchButton,
	LogsList,
	LogItem,
	LogDate,
	ErrorLabel,
	WarnLabel,
	InfoLabel,
	VerboseLabel,
	DebugLabel,
	SillyLabel,
	LogText,
	NotFound
} from 'src/styles/LogsStyles';

import { LOGS } from './mockData';
import { filterLogs, calculateErrStats } from 'src/services/logstats/logs';

const LEVELS = {
	0: <ErrorLabel>ERROR</ErrorLabel>,
	1: <WarnLabel>WARN</WarnLabel>,
	2: <InfoLabel>INFO</InfoLabel>,
	3: <VerboseLabel>VERBOSE</VerboseLabel>,
	4: <DebugLabel>DEBUG</DebugLabel>,
	5: <SillyLabel>SILLY</SillyLabel>
};

interface LogsProps {
	// 	actions: { };
}

interface LogsState {
	filters: {
		levels: { error; warn; info; verbose; debug; silly };
		timespan: string;
	};
	filteredLogs: Array<{ timestamp; level; text }>;
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
				timespan: 'last 24 hours'
			},
			filteredLogs: [],
			errStats: [{ timestamp: Date.now(), errors: 0 }]
		};

		this.applyFilters = this.applyFilters.bind(this);
		this.handleLevelsChange = this.handleLevelsChange.bind(this);
		this.handleTimespanChange = this.handleTimespanChange.bind(this);
	}

	componentDidMount() {
		let nextState = {
			...this.state,
			filteredLogs: filterLogs(LOGS, this.state.filters),
			errStats: calculateErrStats(LOGS, 'last 24 hours')
		};
		this.setState(nextState);
	}

	handleLevelsChange(e) {
		//	this.setState({ timespan: e.currentTarget.value; })
		let nextState = {
			...this.state,
			filters: {
				...this.state.filters,
				levels: {
					...this.state.filters.levels,
					[e.currentTarget.name]: e.currentTarget.checked
				}
			}
		};
		this.setState(nextState);
	}

	handleTimespanChange(e) {
		//	this.setState({ timespan: e.currentTarget.value; })
		let nextState = {
			...this.state,
			filters: {
				...this.state.filters,
				timespan: e.currentTarget.value
			},
			errStats: calculateErrStats(LOGS, e.currentTarget.value)
		};
		this.setState(nextState);
	}

	applyFilters(logs, filters) {
		let filteredByDate = filterLogs(logs, filters);
		let nextState = {};
		nextState = {
			...this.state,
			filteredLogs: filteredByDate
		};
		this.setState(nextState);
	}

	render() {
		// for searchButton filtering
		let found;
		if (this.state.filteredLogs.length === 0) {
			found = <NotFound>Nothing found</NotFound>;
		} else {
			found = this.state.filteredLogs.map((logItem, i) => {
				const date = new Date(logItem.timestamp);
				const dateString = date.toLocaleString();
				return (
					<LogItem key={i}>
						<LogDate>{dateString}</LogDate>
						{LEVELS[logItem.level]}
						<LogText>{logItem.text}</LogText>
					</LogItem>
				);
			});
		}

		return (
			<React.Fragment>
				<ChartWrapper>
					<ChartHeader>Errors Statistics</ChartHeader>
					<ErrChart
						data={this.state.errStats}
						timeRange={this.state.filters.timespan}
					/>
				</ChartWrapper>
				<LogsSearchForm>
					<LevelPicker>
						<span>Select logs' levels</span>
						<Level>
							<input
								type="checkbox"
								name="error"
								checked={this.state.filters.levels.error}
								onChange={this.handleLevelsChange}
							/>
							Error
						</Level>
						<Level>
							<input
								type="checkbox"
								name="warn"
								checked={this.state.filters.levels.warn}
								onChange={this.handleLevelsChange}
							/>
							Warn
						</Level>
						<Level>
							<input
								type="checkbox"
								name="info"
								checked={this.state.filters.levels.info}
								onChange={this.handleLevelsChange}
							/>
							Info
						</Level>
						<Level>
							<input
								type="checkbox"
								name="verbose"
								checked={this.state.filters.levels.verbose}
								onChange={this.handleLevelsChange}
							/>
							Verbose
						</Level>
						<Level>
							<input
								type="checkbox"
								name="debug"
								checked={this.state.filters.levels.debug}
								onChange={this.handleLevelsChange}
							/>
							Debug
						</Level>
						<Level>
							<input
								type="checkbox"
								name="silly"
								checked={this.state.filters.levels.silly}
								onChange={this.handleLevelsChange}
							/>
							Silly
						</Level>
					</LevelPicker>
					<TimeSpanPicker
						name="timespan"
						value={this.state.filters.timespan}
						onChange={this.handleTimespanChange}
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

					<SearchButton
						onClick={e => {
							e.preventDefault();
							this.applyFilters(LOGS, this.state.filters);
						}}
					>
						<SearchIcon size="20px" /> Search
					</SearchButton>
				</LogsSearchForm>
				<LogsList>{found}</LogsList>
			</React.Fragment>
		);
	}
}

export default Logs;
