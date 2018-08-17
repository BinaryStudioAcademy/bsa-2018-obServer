import * as React from 'react';
import { ChartHeader } from '../../styles/Styles';
import CoresLoadLineChart from '../../components/charts/serverResources/CoresLoadLineChart';
import PercentMemoryChart from '../../components/charts/serverResources/PercentMemoryChart';
import MemoryUsedChart from '../../components/charts/serverResources/MemoryUsedChart';

import { memoryPercent, memoryMB, coresLoad } from './mockData';

class ServerResources extends React.Component {
	render() {
		return (
			<div
				style={{
					padding: '60px',
					margin: 'auto',
					backgroundColor: '#fff',
					minHeight: '100%'
				}}
			>
				<h1 style={{ textAlign: 'center', marginBottom: '100px' }}>
					Server Resources
				</h1>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr',
						gridGap: '40px'
					}}
				>
					<div>
						<ChartHeader>CPU Load, %</ChartHeader>
						<CoresLoadLineChart data={coresLoad} />
					</div>
					<div>
						<ChartHeader>Memory Load, %</ChartHeader>
						<PercentMemoryChart data={memoryPercent} />
					</div>
					<div>
						<ChartHeader>Used Memory, MB</ChartHeader>
						<MemoryUsedChart data={memoryMB} />
					</div>
				</div>
			</div>
		);
	}
}

export default ServerResources;
