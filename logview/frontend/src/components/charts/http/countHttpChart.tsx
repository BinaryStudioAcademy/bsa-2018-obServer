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

export default class HttpCountChart extends React.Component<any, any> {
	render() {
		return (
			<ResponsiveContainer width="100%" height="80%" aspect={2}>
				<LineChart
					data={this.props.data}
					margin={{ top: 20, right: 40, left: 15, bottom: 20 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="timestamp"
						tickFormatter={convertXAxisTime(this.props.timeRange)}
						strokeWidth={0}
						minTickGap={20}
						tick={{ transform: 'translate(0, 10)' }}
					/>
					<YAxis strokeWidth={0} minTickGap={20} />
					<Tooltip content={renderTooltipContent} />
					<Line
						type="linear"
						dataKey="count"
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
					{`${entry.name}: ${entry.value}`}
				</p>
			))}
		</div>
	);
};
