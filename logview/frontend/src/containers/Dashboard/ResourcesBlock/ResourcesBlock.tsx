import * as React from 'react';
import CoresLoadLineChart from '../../../components/charts/serverResources/CoresLoadLineChart';
import { Timer } from 'styled-icons/material';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	getLogs,
	getNewCpuLog,
	getNewMemoryLog
} from '../../../redux/logs/actions';
import { startChannel, stopChannel } from '../../../redux/sockets/actions';
import { CpuLogState, MemoryLogState } from '../../../types/LogsState';
import {
	cpuParser,
	memoryParser,
	memoryMbParser
} from '../../../services/chartParser';
import {
	ChartInfo,
	ChartHeader,
	ChartWrapper,
	ChartTimeRange
} from '../../ServerResources/ServerResourcesStyles';
import {
	ChartsWrapper,
	Title,
	Chart,
	ChartGrid,
	TitleSmall
} from './ResourcesBlockStyles';
import { Submit } from '../../../styles/Styles';
import { Link } from 'react-router-dom';
import { defaultState } from '../../../redux/defaultState';
import initialValues from './ResourcesInitalValues';

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
	interval: Number;
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
			interval: 1000,
			currentCpuLog: {},
			currentMemoryLog: {},
			popup: false,
			wrapperRef: undefined,
			active: '',
			initial: true
		};

		this.handleActive = this.handleActive.bind(this);
	}

	componentDidMount() {
		this.props.actions.startChannel();
		clearInterval(timerID);
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
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(timerID);
		this.props.actions.stopChannel();
	}

	handleActive(activeApp) {
		this.setState({ active: activeApp });
	}

	render() {
		return (
			<ChartsWrapper>
				<Title>Server Resources</Title>

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
								data={
									this.state.cpuLogs.length > 2
										? this.state.cpuLogs
										: initialValues
								}
								timeRange="last 10 minutes"
							/>
						</Chart>
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
				</ChartGrid>
				<Submit>
					<Link to="/dashboard/resources">open resources</Link>
				</Submit>
			</ChartsWrapper>
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
