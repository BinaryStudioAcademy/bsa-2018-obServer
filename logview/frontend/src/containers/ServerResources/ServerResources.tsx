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

import { memoryPercent, memoryMB, coresLoad } from './mockData';

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
}

class ServerResources extends React.Component<
	ServerResourcesProps,
	ServerResourcesState
> {
	constructor(props: any) {
		super(props);

		this.state = {
			cpuLogs: [],
			memoryLogs: []
		};

	}

	parser(cpuArr) {
		const arr = [];
		cpuArr.forEach((elem, index) => {
			if (index > 0) {
				let obj = {};
				elem.data.cores.forEach(core => {
					obj[core.coreName] = core.coreLoadPercentages;
				});
				obj['timestamp'] = elem.timestamp;
				arr.push(obj);
			}
		});
		return arr;
	}

	componentDidMount() {
		setInterval(() => {
			this.setState({cpuLogs: this.parser(this.props.cpuLogs)});
		}, 2000);
	}

	render() {
		return (
			<ChartsPageWrapper>
				<h1 style={{ textAlign: 'center', marginBottom: '100px' }}>
					Server Resources
				</h1>

				<ChartGrid>
					<ChartWrapper>
						<ChartHeader>
							<h3>CPU Load, %</h3>
							<ChartTimeRange>
								<Timer size="24px" /> last 10 minutes
							</ChartTimeRange>
						</ChartHeader>
						<CoresLoadLineChart
							data={
								this.state.cpuLogs
							}
							timeRange="last 10 minutes"
						/>
					</ChartWrapper>
					<ChartWrapper>
						<ChartHeader>
							<h3>Memory Load, %</h3>
							<ChartTimeRange>
								<Timer size="24px" /> last hour
							</ChartTimeRange>
						</ChartHeader>
						<PercentMemoryChart
							data={memoryPercent}
							timeRange="last hour"
						/>
					</ChartWrapper>
					<ChartWrapper>
						<ChartHeader>
							<h3>Used Memory, MB</h3>
							<ChartTimeRange>
								<Timer size="24px" /> last day
							</ChartTimeRange>
						</ChartHeader>
						<MemoryUsedChart data={memoryMB} timeRange="last day" />
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
