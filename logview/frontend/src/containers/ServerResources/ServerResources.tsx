import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	getLogs,
	getNewCpuLog,
	getNewMemoryLog
} from '../../redux/logs/actions';
import { startChannel, stopChannel } from '../../redux/sockets/actions';
import { CpuLogState, MemoryLogState } from '../../types/LogsState';
import {
	cpuParser,
	memoryParser,
	memoryMbParser
} from '../../services/chartParser';
import {
	ChartInfo,
	ChartGrid,
	ChartWrapper,
	ChartsPageWrapper,
	Title
} from './ServerResourcesStyles';
import { TitleSmall } from 'src/containers/Dashboard/ResourcesBlock/ResourcesBlockStyles';
import intervalsInitialValues from './IntervalsInitialValues';
import ServerResourcesChart from './ServerResourcesChart';

let timerID;

interface ServerResourcesProps {
	actions: {
		getLogs: Function;
		getNewCpuLog: Function;
		getNewMemoryLog: Function;
		startChannel: Function;
		stopChannel: Function;
	};
	memoryLogs: Array<MemoryLogState>;
	cpuLogs: Array<CpuLogState>;
}

interface ServerResourcesState {
	cpuLogs: Array<any>;
	memoryLogs: Array<any>;
	memoryMbLogs: Array<any>;
	currentCpuLog: any;
	currentMemoryLog: any;
	popup: boolean;
	wrapperRef: any;
	active: string;
	initial: boolean;
}

class ServerResources extends React.Component<
	ServerResourcesProps,
	ServerResourcesState
> {
	constructor(props: any) {
		super(props);

		this.state = {
			cpuLogs: [],
			memoryLogs: [],
			memoryMbLogs: [],
			currentCpuLog: {},
			currentMemoryLog: {},
			popup: false,
			wrapperRef: undefined,
			active: '',
			initial: true
		};
	}

	componentWillMount() {}

	componentDidMount() {
		clearInterval(timerID);
		this.props.actions.startChannel();
		if (this.state.initial) {
			this.setState({ cpuLogs: cpuParser(this.props.cpuLogs) });
			this.setState({ memoryLogs: memoryParser(this.props.memoryLogs) });
			this.setState({ initial: false });
		}

		timerID = setInterval(() => {
			this.setState({ cpuLogs: cpuParser(this.props.cpuLogs) });
			this.setState({ memoryLogs: memoryParser(this.props.memoryLogs) });
			this.setState({
				memoryMbLogs: memoryMbParser(this.props.memoryLogs)
			});
			this.setState({
				currentCpuLog: this.props.cpuLogs[this.props.cpuLogs.length - 1]
			});
			this.setState({
				currentMemoryLog: this.props.memoryLogs[
					this.props.memoryLogs.length - 1
				]
			});
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(timerID);
		this.props.actions.stopChannel();
	}

	render() {
		return (
			<ChartsPageWrapper>
				<Title>Server Resources</Title>

				<ChartGrid>
					<ChartWrapper>
						<ServerResourcesChart
							title="CPU Load, %"
							logs={this.state.cpuLogs}
							caller="cpuLoad"
						/>
						<ChartInfo>
							<div>
								<TitleSmall>Total CPU load:</TitleSmall>
								{this.state.currentCpuLog.totalLoadPercentages}
							</div>
							<div>
								<TitleSmall>Cores CPU load:</TitleSmall>
								{this.state.currentCpuLog.cores &&
									this.state.currentCpuLog.cores.map(
										(el, i) => (
											<div key={i}>
												{el.coreName}:{' '}
												{el.coreLoadPercentages}
											</div>
										)
									)}
							</div>
						</ChartInfo>
					</ChartWrapper>
					<ChartWrapper>
						<ServerResourcesChart
							title="Memory Load, %"
							logs={this.state.memoryLogs}
							caller="memoryLoad"
						/>
						<ChartInfo>
							<div>
								<TitleSmall>All memory:</TitleSmall>
								{this.state.currentMemoryLog.allMemory}
							</div>
							<div>
								<TitleSmall>Used Memory:</TitleSmall>
								{this.state.currentMemoryLog.allMemory -
									this.state.currentMemoryLog.freeMemory}
							</div>
							<div>
								<TitleSmall>Free Memory:</TitleSmall>
								{this.state.currentMemoryLog.freeMemory}
							</div>
						</ChartInfo>
					</ChartWrapper>
					<ChartWrapper>
						<ServerResourcesChart
							title="Used Memory, MB"
							logs={this.state.memoryMbLogs}
							caller="usedMemoryMb"
						/>
						<ChartInfo />
					</ChartWrapper>
				</ChartGrid>
			</ChartsPageWrapper>
		);
	}
}

const mapStateToProps = ({ cpuLogs, memoryLogs }) => ({
	cpuLogs,
	memoryLogs
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators(
		{ getLogs, getNewCpuLog, getNewMemoryLog, startChannel, stopChannel },
		dispatch
	)
});

const ServerResourcesConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(ServerResources);

export default ServerResourcesConnected;
