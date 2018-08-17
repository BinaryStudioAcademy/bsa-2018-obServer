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
					margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
				>
					<XAxis
						dataKey="timestamp"
						tickFormatter={convertToHourMinuteSecond}
						strokeWidth={0}
						minTickGap={20}
					/>
					<YAxis strokeWidth={0} />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip content={renderTooltipContent} />
					<Legend
						padding={{ top: 50, left: 20, right: 20, bottom: 20 }}
					/>
					{this.renderLines()}}
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
						{`${entry.name}: ${entry.value}%`}
					</li>
				))}
			</ul>
		</div>
	);
};
