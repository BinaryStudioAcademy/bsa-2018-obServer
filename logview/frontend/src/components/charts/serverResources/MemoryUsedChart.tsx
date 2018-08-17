import * as React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts';

import {
	convertXAxisTime,
	convertToDateTime
} from '../convertors/tickFormatter';

export default class MemoryUsedChart extends React.Component<any, any> {
	render() {
		return (
			<ResponsiveContainer width="100%" aspect={2}>
				<LineChart
					data={this.props.data}
					margin={{ top: 20, right: 0, left: -20, bottom: 20 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="timestamp"
						tickFormatter={convertXAxisTime(this.props.timeRange)}
						strokeWidth={0}
						minTickGap={20}
						tick={{ transform: 'translate(0, 5)' }}
					/>
					<YAxis strokeWidth={0} minTickGap={20} />
					<Tooltip content={renderTooltipContent} />
					<Legend wrapperStyle={{ bottom: 10 }} />
					<Line
						type="linear"
						dataKey="usedMemory"
						strokeWidth={2}
						stroke="#f70000"
						activeDot={{ r: 8 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		);
	}
}

const renderTooltipContent = o => {
	const { payload, label } = o;

	return (
		<div
			style={{
				backgroundColor: '#fff',
				padding: '5px',
				border: '1px solid #d9d9d9'
			}}
		>
			<p className="total">{`${convertToDateTime(label)}`}</p>
			{payload.map((entry, index) => (
				<p key={`item-${index}`} style={{ color: entry.color }}>
					{`${entry.name}: ${entry.value} MB`}
				</p>
			))}
		</div>
	);
};
