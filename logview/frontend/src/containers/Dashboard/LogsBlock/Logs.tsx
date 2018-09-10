import * as React from 'react';
import { Search as SearchIcon } from 'styled-icons/material';
import ErrChart from '../../../components/charts/logs/ErrChart';

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
} from '../../../styles/LogsStyles';

import { filterLogs, calcErrStats } from '../../../services/logstats/logs';
import { LOGS } from '../../Logs/mockData';
import UpdateTimer from '../../../components/UpdateTimer/UpdateTimer';
import { Submit } from '../../../styles/Styles';
import { RowContainer } from '../DashboardStyles';
import { LogsContainer, LogsList } from './LogsStyles';
import LevelsSelect from '../../../components/LevelsSelect/LevelsSelect';
import { Link } from 'react-router-dom';
import LevelsSelectData from './LevelsSelectData';
import Options from '../../../components/LevelsSelect/LevelsSelectTypes';

const LEVELS = {
	0: <ErrorLabel>ERROR</ErrorLabel>,
	1: <WarnLabel>WARN</WarnLabel>,
	2: <InfoLabel>INFO</InfoLabel>,
	3: <VerboseLabel>VERBOSE</VerboseLabel>,
	4: <DebugLabel>DEBUG</DebugLabel>,
	5: <SillyLabel>SILLY</SillyLabel>
};

interface LogsProps {}

interface LogsState {
	filters: {
		levels: {
			error: boolean;
			warn: boolean;
			info: boolean;
			verbose: boolean;
			debug: boolean;
			silly: boolean;
		};
		timespan: string;
	};
	filteredLogs: Array<{ timestamp; level; text }>;
	errStats: Array<{ timestamp; errors }>;
	levelsSelectOptions: Array<Options>;
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
			levelsSelectOptions: []
		};

		this.applyFilters = this.applyFilters.bind(this);
		this.handleLevelsChange = this.handleLevelsChange.bind(this);
		this.handleTimespanChange = this.handleTimespanChange.bind(this);
		this.handleActive = this.handleActive.bind(this);
	}

	handleActive(data) {
		this.setState({ levelsSelectOptions: data });
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
			errStats: calcErrStats(LOGS, '', e.currentTarget.value)
		};
		this.setState(nextState);
	}

	applyFilters(logs, filters) {
		let filteredByDate = filterLogs(
			logs,
			'',
			filters.timespan,
			filters.levels
		);
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
					<LevelsSelect
						onActive={this.handleActive}
						options={LevelsSelectData}
					/>

					<UpdateTimer onActive={this.handleActive} />

					<Submit
						onClick={e => {
							e.preventDefault();
							this.applyFilters(LOGS, this.state.filters);
						}}
						style={{ margin: '0px 10px' }}
					>
						<RowContainer>
							<SearchIcon size="20px" />
							<span>Search</span>
						</RowContainer>
					</Submit>
				</LogsSearchForm>
				<LogsList>{found}</LogsList>
				<Submit>
					<Link to="/dashboard/logs">open logs</Link>
				</Submit>
			</LogsContainer>
		);
	}
}

export default Logs;
