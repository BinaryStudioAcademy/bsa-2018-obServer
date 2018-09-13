import * as React from 'react';
import moment from 'moment';
import { Method } from './Utils';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class HttpTableDemo extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data
		};
	}
	render() {
		const { data } = this.state;
		return (
			<ReactTable
				data={data}
				minRows={0}
				columns={[
					{
						Header: 'Data',
						columns: [
							{
								Header: 'Time',
								id: 'timestamp',
								accessor: d =>
									moment(d.timestamp).format(
										'MMM DD YYYY, h:mm:ss a'
									)
							},
							{
								Header: 'Method',
								id: 'method',
								accessor: d => d.method,
								Cell: row => <Method method={row.value} />
							},
							{
								Header: 'Route',
								id: 'route',
								accessor: d => d.route
							},
							{
								Header: 'Requests',
								id: 'requestsCount',
								accessor: d => d.requestsCount
							},
							{
								Header: 'Response Time',
								id: 'responseTimeAvg',
								accessor: d => d.responseTimeAvg
							}
						]
					}
				]}
				defaultPageSize={10}
				className="-striped -highlight"
			/>
		);
	}
}
