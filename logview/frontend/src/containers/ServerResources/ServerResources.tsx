import * as React from 'react';
import {
	ChartHeader,
	ChartGrid,
	ChartWrapper,
	ChartsPageWrapper,
	ChartTimeRange
} from '../../styles/Styles';
import CoresLoadLineChart from '../../components/charts/serverResources/CoresLoadLineChart';
import PercentMemoryChart from '../../components/charts/serverResources/PercentMemoryChart';
import MemoryUsedChart from '../../components/charts/serverResources/MemoryUsedChart';
import { Timer } from 'styled-icons/material';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLogs, getNewCpuLog, getNewMemoryLog } from 'src/redux/logs/actions';
import { CpuLogState, MemoryLogState } from 'src/types/LogsState';
import {
	cpuParser,
	memoryParser,
	memoryMbParser
} from 'src/services/chartParser';
import { Chart, ChartInfo } from '../../styles/ChartStyles';

let timerID;

interface ServerResourcesProps {
	actions: {
		getLogs: Function;
		getNewCpuLog: Function;
		getNewMemoryLog: Function;
	};
	memoryLogs: Array<MemoryLogState>;
	cpuLogs: Array<CpuLogState>;
}

interface ServerResourcesState {
	cpuLogs: Array<any>;
	memoryLogs: Array<any>;
	memoryMbLogs: Array<any>;
	interval: Number;
	currentCpuLog: any;
	currentMemoryLog: any;
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
			interval: 1000,
			currentCpuLog: {},
			currentMemoryLog: {}
		};
	}

	componentDidMount() {
		clearInterval(timerID);
		timerID = setInterval(() => {
			this.setState({ cpuLogs: cpuParser(this.props.cpuLogs) });
			this.setState({ memoryLogs: memoryParser(this.props.memoryLogs) });
			this.setState({
				memoryMbLogs: memoryMbParser(this.props.memoryLogs)
			});
			this.setState({
				currentCpuLog: this.props.cpuLogs[this.props.cpuLogs.length - 1]
			});
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(timerID);
	}

	render() {
		return (
			<ChartsPageWrapper>
				<h1 style={{ textAlign: 'center', marginBottom: '100px' }}>
					Server Resources
				</h1>

				

				<ChartGrid>
					<ChartWrapper>
						<Chart>
							<ChartHeader>
								<h3>CPU Load, %</h3>
								<ChartTimeRange>
									<Timer size="24px" /> last 10 minutes
								</ChartTimeRange>
							</ChartHeader>
							<CoresLoadLineChart
								data={this.state.cpuLogs}
								timeRange="last 10 minutes"
							/>
						</Chart>
						<ChartInfo>
							<div>
								{this.state.currentCpuLog.data
									? this.state.currentCpuLog.data.cores.map(
											el => (
												<div>
													{el.coreName}:{' '}
													{el.coreLoadPercentages}
												</div>
											)
									  )
									: undefined}
							</div>
							<div>
								{this.state.currentCpuLog.timestamp !== ''
									? this.state.currentCpuLog.timestamp
									: undefined}
							</div>
							<div>a3</div>
						</ChartInfo>
					</ChartWrapper>
					<ChartWrapper>
						<Chart>
							<ChartHeader>
								<h3>Memory Load, %</h3>
								<ChartTimeRange>
									<Timer size="24px" /> last hour
								</ChartTimeRange>
							</ChartHeader>
							<PercentMemoryChart
								data={this.state.memoryLogs}
								timeRange="last hour"
							/>
						</Chart>
						<ChartInfo>
							<div>a1</div>
							<div>a2</div>
							<div>a3</div>
						</ChartInfo>
					</ChartWrapper>
					<ChartWrapper>
						<Chart>
							<ChartHeader>
								<h3>Used Memory, MB</h3>
								<ChartTimeRange>
									<Timer size="24px" /> last day
								</ChartTimeRange>
							</ChartHeader>
							<MemoryUsedChart
								data={this.state.memoryMbLogs}
								timeRange="last day"
							/>
						</Chart>
						<ChartInfo>
							<div>a1</div>
							<div>a2</div>
							<div>a3</div>
						</ChartInfo>
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
		{ getLogs, getNewCpuLog, getNewMemoryLog },
		dispatch
	)
});

const ServerResourcesConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(ServerResources);

export default ServerResourcesConnected;
