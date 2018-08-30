import * as React from 'react';
import { Search as SearchIcon } from 'styled-icons/material';
import ErrChart from '../../components/charts/logs/ErrChart';
import { errorStats } from './mockData';

import {
	ChartWrapper,
	ChartHeader,
	LogsSearchForm,
	LevelPicker,
	DateLabel,
	DatePicker,
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

const LEVELS = {
	0: <ErrorLabel>ERROR</ErrorLabel>,
	1: <WarnLabel>WARN</WarnLabel>,
	2: <InfoLabel>INFO</InfoLabel>,
	3: <VerboseLabel>VERBOSE</VerboseLabel>,
	4: <DebugLabel>DEBUG</DebugLabel>,
	5: <SillyLabel>SILLY</SillyLabel>
};

const LOGS = [
	{
		date: 1534574894940,
		level: 2,
		text: 'Database populated with logs successfully'
	},
	{ date: 1534644894940, level: 5, text: 'Added style for log items' },
	{ date: 1534714894940, level: 4, text: 'Saved input value into a state' },
	{
		date: 1534784894940,
		level: 0,
		text: 'Saved values rendered incorrectly'
	},
	{ date: 1534854894940, level: 1, text: "Logs' colors not work" },
	{ date: 1534924894940, level: 3, text: 'Added text to levels' },
	{
		date: 1534994894940,
		level: 1,
		text: "Datetime input doesn't work in Firefox"
	},
	{ date: 1535064894940, level: 5, text: 'Added some minor options' },
	{ date: 1535134894940, level: 0, text: 'Compiled incorrectly' },
	{ date: 1535204894940, level: 4, text: 'Fixed typo' },
	{ date: 1535274894940, level: 2, text: 'Everything is OK' }
];

interface LogsProps {
	// 	actions: { search: Function };
}

interface LogsState {
	filters: {
		level: number;
		startDate;
		endDate;
	};
	// for searchButton filtering
	filteredLogs: Array<{ date; level; text }>;
	errStats: {
		divider: number;
		startDate;
		endDate;
		errData: Array<{ date; quantity }>;
	};
}

class Logs extends React.Component<LogsProps, LogsState> {
	constructor(props: LogsProps) {
		super(props);

		this.state = {
			filters: {
				level: 2,
				startDate: '',
				endDate: ''
			},
			filteredLogs: [],
			errStats: {
				divider: 10,
				startDate: '',
				endDate: '',
				errData: []
			}
		};

		this.applyFilters = this.applyFilters.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.applyFilters(LOGS, { level: 2 });
	}

	applyFilters(logs, filters) {
		if (filters.endDate && filters.startDate > filters.endDate) {
			alert('End date cannot be earlier then start date.');
		} else {
			const startDateFormatted = new Date(filters.startDate);
			const endDateFormatted = new Date(filters.endDate);
			const startDateValue = startDateFormatted.valueOf();
			const endDateValue = endDateFormatted.valueOf();
			let filteredByLevel = logs.filter(log => {
				return log.level <= filters.level;
			});

			let filteredByStartDate = [];
			filters.startDate
				? (filteredByStartDate = filteredByLevel.filter(log => {
						return log.date >= startDateValue;
				  }))
				: (filteredByStartDate = filteredByLevel);

			let filtered = [];
			filters.endDate
				? (filtered = filteredByStartDate.filter(log => {
						return log.date <= endDateValue;
				  }))
				: (filtered = filteredByStartDate);

			let nextState = {};
			// Drawing chart depending on whether start and end dates provided
			let errData = [];
			if (
				this.state.filters.startDate === '' &&
				this.state.filters.endDate === ''
			) {
				// logs are supposed to be sorted by date
				errData = this.calculateErrStats(
					LOGS,
					LOGS[0].date,
					Date.now(),
					this.state.errStats.divider
				);
				nextState = {
					...this.state,
					filteredLogs: filtered,
					errStats: {
						...this.state.errStats,
						errData: errData
					}
				};
			} else if (this.state.filters.startDate === '') {
				errData = this.calculateErrStats(
					filtered,
					LOGS[0].date,
					endDateValue,
					this.state.errStats.divider
				);

				nextState = {
					...this.state,
					filteredLogs: filtered,
					errStats: {
						...this.state.errStats,
						errData: errData
					}
				};
			} else if (this.state.filters.endDate === '') {
				errData = this.calculateErrStats(
					filtered,
					startDateValue,
					Date.now(),
					this.state.errStats.divider
				);

				nextState = {
					...this.state,
					filteredLogs: filtered,
					errStats: {
						...this.state.errStats,
						errData: errData
					}
				};
			} else if (
				startDateValue === this.state.errStats.startDate &&
				endDateValue === this.state.errStats.endDate
			) {
				nextState = {
					...this.state,
					filteredLogs: filtered
				};
			} else {
				errData = this.calculateErrStats(
					filtered,
					startDateValue,
					endDateValue,
					this.state.errStats.divider
				);

				nextState = {
					...this.state,
					filteredLogs: filtered,
					errStats: {
						...this.state.errStats,
						startDate: startDateValue,
						endDate: endDateValue,
						errData: errData
					}
				};
			}

			this.setState(nextState);
		}
	}

	/**
	 * Returns errStats regarding provided period and chart-bars number (here: 10)
	 * @param logs
	 * @param startDateIncluded
	 * @param endDate
	 * @param divider
	 */
	calculateErrStats(logs, startDateIncluded, endDate, divider) {
		const startDate = startDateIncluded - 1; // to include first datestamp
		const period = endDate - startDate;
		if (period < 10000) {
			alert('Chosen period is too small to draw chart.');
			return [];
		}
		let res = [];
		const step = Math.round(period / divider);
		let startDateStamp = startDate;
		let endDateStamp = startDateStamp + step;
		for (let i = 0; i < divider; i++) {
			let item = { timestamp: 0, errors: 0 };
			item.timestamp = endDateStamp;
			item.errors = logs.filter(log => {
				return (
					log.level === 0 &&
					log.date > startDateStamp &&
					log.date <= endDateStamp
				);
			}).length;
			res.push(item);
			startDateStamp = endDateStamp;
			endDateStamp += step;
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
		console.log('State:', this.state);
		// for searchButton filtering
		let found;
		if (this.state.filteredLogs.length === 0) {
			found = <NotFound>Nothing found</NotFound>;
		} else {
			found = this.state.filteredLogs.map((logItem, i) => {
				const date = new Date(logItem.date);
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
						// data={errorStats}
						data={this.state.errStats.errData}
						timeRange="last day"
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
					<DateLabel>From: </DateLabel>
					<DatePicker
						type="datetime-local"
						name="startDate"
						pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
						placeholder="2018-08-26T12:00"
						value={this.state.filters.startDate}
						onChange={e => this.handleChange(e)}
					/>
					<DateLabel>To: </DateLabel>
					<DatePicker
						type="datetime-local"
						name="endDate"
						pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
						placeholder="2018-08-26T12:00"
						value={this.state.filters.endDate}
						onChange={e => this.handleChange(e)}
					/>

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
