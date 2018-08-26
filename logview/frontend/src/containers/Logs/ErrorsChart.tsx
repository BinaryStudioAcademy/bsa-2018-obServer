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

import { convertXAxisTime, convertToDateTime } from './tickFormatter';

const Color = [
	'#ff3300',
	'#0037ff',
	'#6600cc',
	'#ff6600',
	'#248f24',
	'#0000ff',
	'#666699'
];

export default class CoresLoadLineChart extends React.Component<any, any> {
	renderLines() {
		let lines = [],
			count = 0;

		for (let dataKey in this.props.data[0]) {
			if (dataKey !== 'timestamp') {
				lines.push(
					<Line
						type="monotone"
						strokeWidth={2}
						dataKey={dataKey}
						dot={false}
						stroke={Color[count]}
						key={dataKey}
					/>
				);
				count++;
			}
		}
		return lines;
	}

	render() {
		return (
			<ResponsiveContainer width="100%" aspect={2}>
				<LineChart
					data={this.props.data}
					margin={{ top: 20, right: 0, left: -30, bottom: 20 }}
				>
					<XAxis
						dataKey="timestamp"
						tickFormatter={convertXAxisTime(this.props.timeRange)}
						strokeWidth={0}
						minTickGap={20}
						tick={{ transform: 'translate(0, 5)' }}
					/>
					<YAxis strokeWidth={0} />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip content={renderTooltipContent} />
					<Legend wrapperStyle={{ bottom: 10 }} />
					{this.renderLines()}}
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
					{`${entry.name}: ${entry.value}`}
				</p>
			))}
		</div>
	);
};
