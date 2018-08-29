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

const LEVELS = {
	0: <ErrorLabel>ERROR</ErrorLabel>,
	1: <WarnLabel>WARN</WarnLabel>,
	2: <InfoLabel>INFO</InfoLabel>,
	3: <VerboseLabel>VERBOSE</VerboseLabel>,
	4: <DebugLabel>DEBUG</DebugLabel>,
	5: <SillyLabel>SILLY</SillyLabel>
};

interface LogsProps {
	// 	actions: { search: Function };
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
			filteredLogs: this.filterLogs(LOGS, this.state.filters),
			errStats: this.calculateErrStats(
				LOGS,
				'last 24 hours',
				Date.now() - 86400000
			)
		};
		this.setState(nextState);
	}

	handleLevelsChange(e) {
		// 	simple approach needs some type fixing
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
		// 	simple approach needs some type fixing
		//	this.setState({ timespan: e.currentTarget.value; })
		let startDateValue;
		let endDateValue = Date.now();

		switch (e.currentTarget.value) {
			case 'last hour':
				startDateValue = endDateValue - 3600000;
				break;
			case 'last 24 hours':
				startDateValue = endDateValue - 86400000;
				break;
			case 'last week':
				startDateValue = endDateValue - 604800000;
				break;
			case 'last 30 days':
				startDateValue = endDateValue - 2592000000;
				break;
			case '':
			default:
				startDateValue = 0;
				break;
		}

		let nextState = {
			...this.state,
			filters: {
				...this.state.filters,
				timespan: e.currentTarget.value
			},
			errStats: this.calculateErrStats(
				LOGS,
				e.currentTarget.value,
				startDateValue
			)
		};
		this.setState(nextState);
	}

	filterLogs(logs, filters) {
		// sorting by log level

		// might be not needed (depending on format of log.level value)
		const levels = {
			0: 'error',
			1: 'warn',
			2: 'info',
			3: 'verbose',
			4: 'debug',
			5: 'silly'
		};
		let filteredByLevel = logs.filter(log => {
			return filters.levels[levels[log.level]] === true;
		});

		// sorting by date
		let filteredByDate = [];
		let endDateValue = Date.now();
		let startDateValue;
		switch (filters.timespan) {
			case 'last hour':
				startDateValue = endDateValue - 3600000;
				break;
			case 'last 24 hours':
				startDateValue = endDateValue - 86400000;
				break;
			case 'last week':
				startDateValue = endDateValue - 604800000;
				break;
			case 'last 30 days':
				startDateValue = endDateValue - 2592000000;
				break;
			case '':
			default:
				startDateValue = 0;
				break;
		}
		filters.timespan && filteredByLevel.length > 0
			? (filteredByDate = filteredByLevel.filter(log => {
					return log.timestamp >= startDateValue;
			  }))
			: (filteredByDate = filteredByLevel);

		return filteredByDate;
	}

	applyFilters(logs, filters) {
		let filteredByDate = this.filterLogs(logs, filters);
		let nextState = {};
		nextState = {
			...this.state,
			filteredLogs: filteredByDate
		};
		this.setState(nextState);
	}

	/**
	 * Returns errStats regarding provided period and chart-bars number (here: 10)
	 * @param logs
	 * @param timespan
	 * @param divider
	 */
	calculateErrStats(logs, timespan, startDateValue) {
		const errorLogs = logs.filter(log => {
			return log.level === 0 && log.timestamp >= startDateValue;
		});

		if (errorLogs.length === 0) {
			return [{ timestamp: Date.now(), errors: 0 }];
		}
		if (timespan === '') {
			return [{ timestamp: Date.now(), errors: errorLogs.length }];
		}

		let res = [],
			step,
			startDateStamp,
			endDateStamp;

		switch (timespan) {
			case 'last hour':
				// 12 chart bars
				step = 300000;
				startDateStamp = startDateValue;
				endDateStamp = startDateStamp + step;
				for (let i = 0; i < 12; i++) {
					let item = { timestamp: 0, errors: 0 };
					item.timestamp = endDateStamp;
					item.errors = errorLogs.filter(log => {
						return (
							log.timestamp >= startDateStamp &&
							log.timestamp <= endDateStamp
						);
					}).length;
					res.push(item);
					startDateStamp = endDateStamp;
					endDateStamp += step;
				}
				break;
			case 'last 24 hours':
				// 24 chart bars
				step = 3600000;
				startDateStamp = startDateValue;
				endDateStamp = startDateStamp + step;
				for (let i = 0; i < 24; i++) {
					let item = { timestamp: 0, errors: 0 };
					item.timestamp = endDateStamp;
					item.errors = errorLogs.filter(log => {
						return (
							log.timestamp >= startDateStamp &&
							log.timestamp <= endDateStamp
						);
					}).length;
					res.push(item);
					startDateStamp = endDateStamp;
					endDateStamp += step;
				}
				break;
			case 'last week':
				// 8 chart bars
				step = 86400000;
				startDateStamp = startDateValue;
				endDateStamp = startDateStamp + step;
				for (let i = 0; i < 8; i++) {
					let item = { timestamp: 0, errors: 0 };
					let startDate = new Date(startDateStamp);
					let startDay = startDate.toDateString();
					let dayMidnight = new Date(startDay);
					item.timestamp = dayMidnight.valueOf();
					item.errors = errorLogs.filter(log => {
						let logDate = new Date(log.timestamp);
						let logDay = logDate.toDateString();
						return logDay === startDay;
					}).length;
					res.push(item);
					startDateStamp = endDateStamp;
					endDateStamp += step;
				}
				break;
			case 'last 30 days':
				// 30 chart bars
				step = 86400000;
				startDateStamp = startDateValue;
				endDateStamp = startDateStamp + step;
				for (let i = 0; i < 31; i++) {
					let item = { timestamp: 0, errors: 0 };
					let startDate = new Date(startDateStamp);
					let startDay = startDate.toDateString();
					let dayMidnight = new Date(startDay);
					item.timestamp = dayMidnight.valueOf();
					item.errors = errorLogs.filter(log => {
						let logDate = new Date(log.timestamp);
						let logDay = logDate.toDateString();
						return logDay === startDay;
					}).length;
					res.push(item);
					startDateStamp = endDateStamp;
					endDateStamp += step;
				}
				break;
			default:
				break;
		}
		return res;
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
				// for instant onInput filtering would be:
				// const found = this.applyFilters(LOGS).map((logItem, i) => {
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
				<LogsSearchForm
					onSubmit={e => {
						e.preventDefault();
						this.applyFilters(LOGS, this.state.filters);
					}}
				>
					{/* <LevelPicker
						name="level"
						value={this.state.filters.level}
						onChange={e => this.handleChange(e)}
					>
						<option value="2">Default levels</option>
						<option value="0">Error</option>
						<option value="1">Warn</option>
						<option value="2">Info</option>
						<option value="3">Verbose</option>
						<option value="4">Debug</option>
						<option value="5">Silly</option>
					</LevelPicker> */}
					<LevelPicker>
						<span>Select logs' levels</span>
						<Level>
							<input
								type="checkbox"
								name="error"
								checked={this.state.filters.levels.error}
								onChange={e => this.handleLevelsChange(e)}
							/>
							Error
						</Level>
						<Level>
							<input
								type="checkbox"
								name="warn"
								checked={this.state.filters.levels.warn}
								onChange={e => this.handleLevelsChange(e)}
							/>
							Warn
						</Level>
						<Level>
							<input
								type="checkbox"
								name="info"
								checked={this.state.filters.levels.info}
								onChange={e => this.handleLevelsChange(e)}
							/>
							Info
						</Level>
						<Level>
							<input
								type="checkbox"
								name="verbose"
								checked={this.state.filters.levels.verbose}
								onChange={e => this.handleLevelsChange(e)}
							/>
							Verbose
						</Level>
						<Level>
							<input
								type="checkbox"
								name="debug"
								checked={this.state.filters.levels.debug}
								onChange={e => this.handleLevelsChange(e)}
							/>
							Debug
						</Level>
						<Level>
							<input
								type="checkbox"
								name="silly"
								checked={this.state.filters.levels.silly}
								onChange={e => this.handleLevelsChange(e)}
							/>
							Silly
						</Level>
					</LevelPicker>
					<TimeSpanPicker
						name="timespan"
						value={this.state.filters.timespan}
						onChange={e => this.handleTimespanChange(e)}
					>
						<option value="last 24 hours">Select time span</option>

						<option value="last hour">last hour</option>

						<option value="last 24 hours">last 24 hours</option>

						<option value="last week">last week</option>

						<option value="last 30 days">last 30 days</option>

						<option value="">all time</option>
					</TimeSpanPicker>

					<SearchButton>
						<SearchIcon size="20px" /> Search
					</SearchButton>
				</LogsSearchForm>
				<LogsList>{found}</LogsList>
			</React.Fragment>
		);
	}
}

export default Logs;
