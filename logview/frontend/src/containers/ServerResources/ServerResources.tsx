import * as React from 'react';
import CoresLoadLineChart from '../../components/charts/serverResources/CoresLoadLineChart';
import PercentMemoryChart from '../../components/charts/serverResources/PercentMemoryChart';
import MemoryUsedChart from '../../components/charts/serverResources/MemoryUsedChart';
import { Timer, Update } from 'styled-icons/material';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLogs, getNewCpuLog, getNewMemoryLog } from 'src/redux/logs/actions';
import { CpuLogState, MemoryLogState } from 'src/types/LogsState';
import {
	cpuParser,
	memoryParser,
	memoryMbParser
} from 'src/services/chartParser';
import {
	Chart,
	ChartInfo,
	ChartHeader,
	ChartGrid,
	ChartWrapper,
	ChartsPageWrapper,
	ChartTimeRange,
	Title
} from './ServerResourcesStyles';
import Select from 'src/components/Select/Select';
import UpdateTimer from '../../components/UpdateTimer/UpdateTimer';

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
	popup: boolean;
	wrapperRef: any;
	active: string;
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
			currentMemoryLog: {},
			popup: false,
			wrapperRef: undefined,
			active: ''
		};

		this.handleActive = this.handleActive.bind(this);
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
			console.log(this.props);
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(timerID);
	}

	handleActive(activeApp) {
		this.setState({ active: activeApp });
	}

	render() {
		return (
			<ChartsPageWrapper>
				<Title>Server Resources</Title>

				<Select
					onActive={this.handleActive}
					options={['app1', 'app2', 'app3']}
				/>

				<ChartGrid>
					<ChartWrapper>
						<Chart>
							<ChartHeader>
								<h3>CPU Load, %</h3>
								<ChartTimeRange>
									<UpdateTimer></UpdateTimer>
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
								{this.state.currentCpuLog.data &&
									this.state.currentCpuLog.data.cores.map(
										(el, i) => (
											<div key={i}>
												{el.coreName}:{' '}
												{el.coreLoadPercentages}
											</div>
										)
									)}
							</div>
							<div>
								{this.state.currentCpuLog.timestamp !== '' &&
									this.state.currentCpuLog.timestamp}
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
