import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLogs } from 'src/redux/log/actions';
import { fetchingState } from 'src/redux/log/reducer';

interface FetchLogsProps {
	actions: { fetchLogs: Function; fetchLogsSuccess: Function };
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
		console.log(this.props);
		return <React.Fragment>SOCKETS</React.Fragment>;
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
