import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLogs, getNewCpuLog, getNewMemoryLog } from '../redux/logs/actions';
import { CpuLogState, MemoryLogState } from '../types/LogsState';

interface FetchLogsProps {
	actions: {
		getLogs: Function;
		getNewCpuLog: Function;
		getNewMemoryLog: Function;
	};
	memoryLogsState: Array<MemoryLogState>;
	cpuLogsState: Array<CpuLogState>;
}

interface FetchLogsState {
	fetching: string;
}

class FetchLogs extends React.Component<FetchLogsProps, FetchLogsState> {
	constructor(props: any) {
		super(props);

		this.state = {
			fetching: ''
		};

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		// this.props.actions.getLogs();
	}

	handleClick() {
		this.props.actions.getNewCpuLog();
		this.props.actions.getNewMemoryLog();
	}

	render() {
		const { cpuLogsState, memoryLogsState } = this.props;
		return (
			<React.Fragment>
				<button onClick={this.handleClick}>click me</button>
				SOCKETS DATA:
				{cpuLogsState ? (
					cpuLogsState.map(log => {
						return (
							<div key={log.timestamp}>
								<p>Log Type: {log.logType}</p>
								<p>Log Timestamp: {log.timestamp}</p>
								<p>Log Data:</p>
								{/* <p> message: {log.data}</p> */}
								{/* <p> status: {log.data}</p> */}
								{/*<p>serverId: {log.companyToken}</p>*/}
							</div>
						);
					})
				) : (
					<p>no data</p>
				)}
				{memoryLogsState ? (
					memoryLogsState.map(log => {
						return (
							<div key={log.timestamp}>
								<p>Log Type: {log.logType}</p>
								<p>Log Timestamp: {log.timestamp}</p>
								<p>Log Data:</p>
								{/* <p> message: {log.data.cores[0].coreLoadPercentages}</p> */}
								{/* <p> status: {log.data.cores[0].coreName}</p> */}
								{/*<p>Company Token: {log.companyToken}</p>*/}
							</div>
						);
					})
				) : (
					<p>no data</p>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ fetching, cpuLogs, memoryLogs }) => ({
	fetching,
	cpuLogs,
	memoryLogs
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators(
		{ getLogs, getNewCpuLog, getNewMemoryLog },
		dispatch
	)
});

const LogsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(FetchLogs);

export default LogsConnected;
