import * as React from 'react';
import {
	BarChart,
	Bar,
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

export default class HttpRoutesBarChart extends React.Component<any, any> {
	render() {
		return (
			<ResponsiveContainer width="100%" aspect={2}>
				<BarChart
					data={this.props.data}
					margin={{ top: 20, right: 40, left: 15, bottom: 20 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="route"
						strokeWidth={0}
						minTickGap={20}
						tick={{ transform: 'translate(0, 5)' }}
					/>
					<YAxis strokeWidth={0} />
					<Tooltip content={renderTooltipContent} />
					<Legend />
					<Bar dataKey="count" fill="#8884d8" />
				</BarChart>
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
			<p className="total">
				<b>{`${label}`}</b>
			</p>
			{payload.map((entry, index) => (
				<p key={`item-${index}`} style={{ color: entry.color }}>
					{`${entry.name}: ${entry.value}`}
				</p>
			))}
		</div>
	);
};
