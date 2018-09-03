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

import { filterLogs, calculateErrStats } from 'src/services/logstats/logs';
import { LOGS } from 'src/containers/Logs/mockData';
import UpdateTimer from '../../components/UpdateTimer/UpdateTimer';
import { Submit } from 'src/styles/Styles';
import { RowContainer } from './DashboardStyles';
import { LogsContainer, LogsList } from './LogsStyles';
import Select from '../../components/Select/Select';
import { Link } from 'react-router-dom';

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
	active: string;
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
			errStats: [{ timestamp: Date.now(), errors: 0 }],
			active: ''
		};

		this.applyFilters = this.applyFilters.bind(this);
		this.handleLevelsChange = this.handleLevelsChange.bind(this);
		this.handleTimespanChange = this.handleTimespanChange.bind(this);
		this.handleActive = this.handleActive.bind(this);
	}

	handleActive(data) {
		this.setState({active: data})
	}

	handleLevelsChange(e) {
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
			<LogsContainer>
				<LogsSearchForm>
					<Select onActive={this.handleActive} options={["error", "warn", "info", "verbose", "debug", "silly"]}/>

					{/* <TimeSpanPicker
						name="timespan"
						value={this.state.filters.timespan}
						onChange={this.handleTimespanChange}
					> */}
					<UpdateTimer onActive={this.handleActive}/>
					{/* </TimeSpanPicker> */}

					<Submit
						onClick={e => {
							e.preventDefault();
							this.applyFilters(LOGS, this.state.filters);
						}}
						style={{'margin': '0px 10px'}}
					>
						<RowContainer><SearchIcon size="20px" /><span>Search</span></RowContainer>
					</Submit>
				</LogsSearchForm>
				<LogsList>{found}</LogsList>
				<Submit>
					<Link to='/dashboard/logs'>open logs</Link>
				</Submit>
			</LogsContainer>
		);
	}
}

export default Logs;
