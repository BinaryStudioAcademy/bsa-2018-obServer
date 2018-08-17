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
	convertToHourMinuteSecond,
	convertToDateTime
} from '../convertors/tickFormatter';

export default class MemoryUsedChart extends React.Component<any, any> {
	render() {
		return (
			<ResponsiveContainer width="100%" aspect={2}>
				<LineChart
					data={this.props.data}
					margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="timestamp"
						tickFormatter={convertToHourMinuteSecond}
						strokeWidth={0}
						minTickGap={20}
					/>
					<YAxis strokeWidth={0} minTickGap={20} />
					<Tooltip content={renderTooltipContent} />
					<Legend />
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
	const total = payload.reduce((result, entry) => result + entry.value, 0);

	return (
		<div
			style={{
				backgroundColor: '#fff',
				padding: '5px',
				border: '1px solid #d9d9d9'
			}}
		>
			<p className="total">{`${convertToDateTime(label)}`}</p>
			<ul style={{ padding: '0', listStyle: 'none' }}>
				{payload.map((entry, index) => (
					<li
						key={`item-${index}`}
						style={{ color: entry.color, padding: '5px' }}
					>
						{`${entry.name}: ${entry.value}, MB`}
					</li>
				))}
			</ul>
		</div>
	);
};
