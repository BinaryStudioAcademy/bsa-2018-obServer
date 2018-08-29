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

const Color = [
	'#ff3300',
	'#0037ff',
	'#6600cc',
	'#ff6600',
	'#248f24',
	'#0000ff',
	'#666699'
];

export default class ErrChart extends React.Component<any, any> {
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
			<ResponsiveContainer width="96%" height="80%">
				<LineChart
					width={600}
					height={300}
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
					{this.renderLines()}}
				</LineChart>
			</ResponsiveContainer>
		);
	}
}

/* 
<ResponsiveContainer width="60%" height="30%">
    	<LineChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="timestamp"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip label={"hello"}/>
       <Legend />
       <Line type="monotone" dataKey="errors" stroke="#8884d8" activeDot={{r: 8}}/>
      </LineChart>
      </ResponsiveContainer>
*/

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
