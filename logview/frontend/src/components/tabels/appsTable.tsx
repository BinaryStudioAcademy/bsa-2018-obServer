import * as React from 'react';
import { SecretKey, DeleteApp, EditApp } from './Utils';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class AppsTabel extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data
		};
	}
	render() {
		const { data } = this.state;
		console.log(data);
		return (
			<div>
				<ReactTable
					data={data}
					minRows={3}
					noDataText="Opps! You do not have any program set up!"
					columns={[
						{
							Header: () => <strong>APP NAME</strong>,
							id: 'appName',
							accessor: d => d.name,
							maxWidth: 300
						},
						{
							Header: () => <strong>SECRET KEY</strong>,
							id: 'appId',
							accessor: d => d.id,
							Cell: row => <SecretKey secretKey={row.value} />,
							minWidth: 200
						},
						{
							Header: () => <strong>EDIT</strong>,
							id: 'editName',
							accessor: d => d.id,
							Cell: row => (
								<EditApp
									secretKey={row.value}
									handleClick={this.props.deleteApp}
								/>
							),
							width: 80
						},
						{
							Header: () => <strong>DELETE</strong>,
							id: 'deleteApp',
							accessor: d => d.id,
							Cell: row => (
								<DeleteApp
									secretKey={row.value}
									handleClick={this.props.deleteApp}
								/>
							),
							width: 80
						}
					]}
					className="-striped -highlight"
				/>
				<br />
			</div>
		);
	}
}
