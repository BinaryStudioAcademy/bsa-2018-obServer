import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLogs } from 'src/redux/log/actions';
import { fetchingState } from 'src/redux/log/reducer';

interface FetchLogsProps {
	actions: { fetchLogs: Function; fetchLogsSuccess: Function };
	logs: {
		logType: string;
		data: { message: string; status: string };
		timestamp: number;
		serverId: number;
	};
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
		this.props.actions.fetchLogs();
	}

	render() {
		const { message, status } = this.props.logs.data
			? this.props.logs.data
			: { message: '', status: '' };
		return (
			<React.Fragment>
				SOCKETS DATA:
				<div>
					LogType:{' '}
					{this.props.logs.logType ? this.props.logs.logType : ''}
					<br />
					Timestamp:{' '}
					{this.props.logs.timestamp ? this.props.logs.timestamp : ''}
					<br />
					ServerId:{' '}
					{this.props.logs.serverId ? this.props.logs.serverId : ''}
					<br />
					Data Message: {message ? message : ''}
					<br />
					Data Status: {status ? status : ''}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ fetching, logs }) => ({
	fetching,
	logs
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ fetchLogs }, dispatch)
});

const LogsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(FetchLogs);

export default LogsConnected;
