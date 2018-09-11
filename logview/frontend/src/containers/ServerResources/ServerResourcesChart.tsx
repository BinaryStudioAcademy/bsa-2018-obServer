import * as React from 'react';
import {
	getLogs,
	getNewCpuLog,
	getNewMemoryLog
} from '../../redux/logs/actions';
import { Chart, ChartHeader } from './ServerResourcesStyles';
import UpdateTimer from '../../components/UpdateTimer/UpdateTimer';
import CoresLoadLineChart from '../../components/charts/serverResources/CoresLoadLineChart';
import PercentMemoryChart from '../../components/charts/serverResources/PercentMemoryChart';
import MemoryUsedChart from '../../components/charts/serverResources/MemoryUsedChart';
import initialValues from '../Dashboard/ResourcesBlock/ResourcesInitalValues';
import intervalsInitialValues from './IntervalsInitialValues';

interface ServerResourcesChartState {
	intervals: Array<{
		caller: string;
		interval: string;
	}>;
}

interface ServerResourcesChartProps {
	title: string;
	logs: Array<any>;
	caller: string;
}

class ServerResourcesChart extends React.Component<
	ServerResourcesChartProps,
	ServerResourcesChartState
> {
	constructor(props: ServerResourcesChartProps) {
		super(props);

		this.state = {
			intervals: intervalsInitialValues
		};

		this.handleActive = this.handleActive.bind(this);
	}

	handleActive(interval, caller) {
		let intervals = this.state.intervals.map(
			el => (el.caller === caller ? (el.interval = interval) : el)
		);
		this.setState({ intervals: intervals });
	}

	render() {
		return (
			<Chart>
				<ChartHeader>
					<h3>{this.props.title}</h3>
					<UpdateTimer />
				</ChartHeader>
				{this.props.caller === 'cpuLoad' && (
					<CoresLoadLineChart
						data={
							this.props.logs.length > 2
								? this.props.logs
								: initialValues
						}
					/>
				)}
				{this.props.caller === 'memoryLoad' && (
					<PercentMemoryChart
						data={
							this.props.logs.length > 2
								? this.props.logs
								: initialValues
						}
					/>
				)}
				{this.props.caller === 'usedMemoryMb' && (
					<MemoryUsedChart
						data={
							this.props.logs.length > 2
								? this.props.logs
								: initialValues
						}
					/>
				)}
			</Chart>
		);
	}
}

export default ServerResourcesChart;
