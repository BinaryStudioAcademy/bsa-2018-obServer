import * as React from 'react';
import moment from 'moment';
import { Method, Tips } from './logStatsUtils';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class LogStatsTable extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data
		};
	}
	render() {
		const { data } = this.state;
		return (
			<div>
				<ReactTable
					data={this.props.data}
					columns={[
						{
							Header: 'Date',
							id: 'timestamp',
							accessor: d =>
								moment(d.timestamp).format(
									'MMM DD YYYY, h:mm:ss a'
								),
							maxWidth: 250
						},
						{
							Header: 'Level',
							id: 'logLevel',
							accessor: d => d.logLevel,
							maxWidth: 80,
							Cell: row => <Method method={row.value} />
						},
						{
							Header: 'Message',
							id: 'message',
							accessor: d => d.message
						}
					]}
					defaultPageSize={10}
					className="-striped -highlight"
				/>
				<br />
				<Tips />
			</div>
		);
	}
}
