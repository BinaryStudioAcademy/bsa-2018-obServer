import * as React from 'react';
import { Search as SearchIcon } from 'styled-icons/material';
import ErrChart from 'src/components/charts/logs/ErrChart';

import {
	ChartWrapper,
	ChartHeader,
	LogsSearchForm,
	LevelPicker,
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
		level: number;
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
				level: 2,
				timespan: 'last 24 hours'
			},
			filteredLogs: [],
			errStats: [{ timestamp: Date.now(), errors: 0 }]
		};

		this.applyFilters = this.applyFilters.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.applyFilters(LOGS, this.state.filters);
	}

	applyFilters(logs, filters) {
		// sorting by log level
		let filteredByLevel = logs.filter(log => {
			return log.level <= filters.level;
		});

		// sorting by date
		let filteredByDate = [];
		const endDateValue = Date.now();
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
		let errData = [{ timestamp: Date.now(), errors: 0 }];
		filters.timespan && filteredByLevel.length > 0
			? (filteredByDate = filteredByLevel.filter(log => {
					return log.timestamp >= startDateValue;
			  }))
			: (filteredByDate = filteredByLevel);
		let nextState = {};

		// calculating errStats
		if (filters.timespan && filteredByDate.length > 0) {
			errData = this.calculateErrStats(
				filteredByDate,
				filters.timespan,
				startDateValue
			);
		}

		nextState = {
			...this.state,
			filteredLogs: filteredByDate,
			errStats: errData
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
			return log.level === 0;
		});

		if (errorLogs.length === 0) {
			return [{ timestamp: Date.now(), errors: 0 }];
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

	handleChange(e) {
		// 	simple approach needs some type fixing
		//	this.setState({ [e.currentTarget.name]: e.currentTarget.value; })
		const nextState = {
			...this.state,
			filters: {
				...this.state.filters,
				[e.currentTarget.name]: e.currentTarget.value
			}
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
					<LevelPicker
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
					</LevelPicker>
					<TimeSpanPicker
						name="timespan"
						value={this.state.filters.timespan}
						onChange={e => this.handleChange(e)}
					>

						<option value="last 24 hours">Select time span</option>

						<option value="last hour">last hour</option>

						<option value="last 24 hours">last 24 hours</option>

						<option value="last week">last week</option>

						<option value="last 30 days">last 30 days</option>

						<option value="">show all</option>

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
