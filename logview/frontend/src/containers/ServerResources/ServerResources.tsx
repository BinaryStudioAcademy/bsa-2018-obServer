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

import { memoryPercent, memoryMB, coresLoad } from './mockData';

class ServerResources extends React.Component {
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
							data={coresLoad}
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

export default ServerResources;
