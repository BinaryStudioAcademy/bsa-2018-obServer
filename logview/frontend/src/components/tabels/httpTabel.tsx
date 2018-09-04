import * as React from 'react';
import moment from 'moment';
import { Method, Tips } from './Utils';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class HttpTabel extends React.Component<any, any> {
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
					data={data}
					minRows={0}
					columns={[
						{
							Header: 'Data',
							columns: [
								{
									Header: 'Timestamp',
									id: 'timestamp',
									accessor: d =>
										moment(d.data.timestamp).format(
											'MMM DD YYYY, h:mm:ss a'
										)
								},
								{
									Header: 'Method',
									id: 'method',
									accessor: d => d.data.method,
									Cell: row => <Method method={row.value} />
								},
								{
									Header: 'Route',
									id: 'route',
									accessor: d => d.data.route
								},
								{
									Header: 'Requests Count',
									id: 'requestsCount',
									accessor: d => d.data.requestsCount
								}
							]
						},
						{
							Header: 'Size',
							columns: [
								{
									Header: 'Body Size Request',
									id: 'bodySizeRequest',
									accessor: d => d.data.bodySizeRequest
								},
								{
									Header: 'Body Size Response',
									id: 'bodySizeResponse',
									accessor: d => d.data.bodySizeResponse
								}
							]
						},
						{
							Header: 'Time',
							columns: [
								{
									Header: 'Response Time Min',
									id: 'response Time Min',
									accessor: d => d.data.responseTimeMin
								},
								{
									Header: 'Response Time Max',
									id: 'responseTimeMax',
									accessor: d => d.data.responseTimeMax
								},
								{
									Header: 'Response Time Avg',
									id: 'responseTimeAvg',
									accessor: d => d.data.responseTimeAvg
								}
							]
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
