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
	convertXAxisTime,
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
					margin={{ top: 20, right: 0, left: -10, bottom: 20 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="timestamp"
						tickFormatter={convertXAxisTime('last 10 minutes')}
						strokeWidth={0}
						minTickGap={20}
						tick={{ transform: 'translate(0, 5)' }}
					/>
					<YAxis
						tickFormatter={convertDecimalToPercent}
						strokeWidth={0}
					/>
					<Tooltip content={renderTooltipContent} />
					<Legend wrapperStyle={{ bottom: 10 }} />
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
			<p>{`all memory: ${total} MB`}</p>
			{payload.map((entry, index) => (
				<p key={`item-${index}`} style={{ color: entry.color }}>
					{`${entry.name}: ${entry.value} MB (${getPercent(
						entry.value,
						total
					)}%)`}
				</p>
			))}
		</div>
	);
};
