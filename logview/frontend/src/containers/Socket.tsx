import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLog } from 'src/redux/log/actions';

interface FetchLogsProps {
	actions: { fetchLog: Function; fetchLogSuccess: Function };
	logs: [
		{
			logType: string;
			data: { message: string; status: string };
			timestamp: number;
			serverId: number;
		}
	];
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
	}

	componentDidMount() {
		this.props.actions.fetchLog();
	}

	render() {
		const { logs } = this.props;
		return (
			<React.Fragment>
				SOCKETS DATA:
				{logs ? (
					logs.map(log => {
						return (
							<div key={log.timestamp}>
								<p>Log Type: {log.logType}</p>
								<p>Log Timestamp: {log.timestamp}</p>
								<p>Log Data:</p>
								<p> message: {log.data.message}</p>
								<p> status: {log.data.status}</p>
								<p>Log Timestamp: {log.serverId}</p>
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

const mapStateToProps = ({ fetching, logs }) => ({
	fetching,
	logs
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ fetchLog }, dispatch)
});

const LogsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(FetchLogs);

export default LogsConnected;
