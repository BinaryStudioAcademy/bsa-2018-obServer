import * as React from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts';

import {
	convertToHourMinuteSecond,
	convertToDateTime,
	convertDecimalToPercent
} from '../convertors/tickFormatter';

export default class PercentMemoryChart extends React.Component<any, any> {
	render() {
		return (
			<ResponsiveContainer width="100%" aspect={2}>
				<AreaChart
					data={this.props.data}
					stackOffset="expand"
					margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="timestamp"
						tickFormatter={convertToHourMinuteSecond}
						strokeWidth={0}
						minTickGap={20}
					/>
					<YAxis
						tickFormatter={convertDecimalToPercent}
						strokeWidth={0}
					/>
					<Tooltip content={renderTooltipContent} />
					<Legend />
					<Area
						type="monotone"
						dataKey="usedMemory"
						stackId="1"
						stroke="#ff0000"
						fill="#f70000"
					/>
					<Area
						type="monotone"
						dataKey="freeMemory"
						stackId="1"
						stroke="#40b265"
						fill="#40b265"
					/>
				</AreaChart>
			</ResponsiveContainer>
		);
	}
}

const getPercent = (value, total) => {
	const ratio = total > 0 ? value / total : 0;

	return convertDecimalToPercent(ratio, 2);
};

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
			<p>{`All memory: ${total}, MB`}</p>
			<ul style={{ padding: '0', listStyle: 'none' }}>
				{payload.map((entry, index) => (
					<li
						key={`item-${index}`}
						style={{ color: entry.color, padding: '5px' }}
					>
						{`${entry.name}: ${entry.value}(${getPercent(
							entry.value,
							total
						)}%)`}
					</li>
				))}
			</ul>
		</div>
	);
};
