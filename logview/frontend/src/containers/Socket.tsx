import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLogs } from 'src/redux/log/actions';

interface FetchLogsProps {
	actions: { fetchLogs: Function };
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
		return <React.Fragment>SOCKETS</React.Fragment>;
	}
}

const mapStateToProps = ({ fetching }) => ({
	fetching
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ fetchLogs }, dispatch)
});

const LogsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(FetchLogs);

export default LogsConnected;
