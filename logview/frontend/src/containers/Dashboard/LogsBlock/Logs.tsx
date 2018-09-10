import * as React from 'react';
// components & their styles
import LevelsSelect from 'src/components/LevelsSelect/LevelsSelect';
import UpdateTimer from 'src/components/UpdateTimer/UpdateTimer';
import { LogsContainer } from './LogsStyles';
import LogStatsTabel from 'src/components/tabels/logStatsTabel';
import { LoaderBars } from 'src/components/loaders';
import { Autorenew } from 'styled-icons/material';
import { Submit } from 'src/styles/Styles';
import { RowContainer } from 'src/containers/Dashboard/DashboardStyles';
import { Link } from 'react-router-dom';
import { LogsSearchForm } from 'src/styles/LogsStyles';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLogMessages } from 'src/redux/logs/actions';
import { LogMessagesState, LogLevelsState } from 'src/types/LogsState';

// data & services
import { filterLogs } from 'src/services/logstats/logs';

interface LogsProps {
	actions: {
		getLogMessages: Function;
	};
	user: { companyId: string };
	fetchingUserStatus: string;
	fetchingLogsStatus: string;
	logMessages: Array<LogMessagesState>;
	activeApp: string;
	timeRange: string;
	logLevels: LogLevelsState;
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
		if (this.props.user.companyId !== prevProps.user.companyId) {
			this.props.actions.getLogMessages(this.props.user.companyId);
		}
	}

	render() {
		return (
			<LogsContainer>
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
					<UpdateTimer />
				</LogsSearchForm>
				{this.props.fetchingLogsStatus === 'success' ? (
					<LogStatsTabel
						data={filterLogs(
							this.props.logMessages,
							this.props.activeApp,
							this.props.timeRange,
							this.props.logLevels
						)}
					/>
				) : (
					<LoaderBars />
				)}
				<Submit>
					<Link to="/dashboard/logs">open logs</Link>
				</Submit>
			</LogsContainer>
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
	actions: bindActionCreators({ getLogMessages }, dispatch)
});

const LogsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Logs);

export default LogsConnected;
