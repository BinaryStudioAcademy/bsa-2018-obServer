import * as React from 'react';
import { SecretKey, DeleteApp } from './Utils';
import EditAppForm from '../settings/EditAppsForm';
import { EditAppRow } from '../../styles/SettingsFormStyles';
import { Edit } from 'styled-icons/fa-solid';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class AppsTable extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			editApp: null
		};
	}

	handleEditClick(app) {
		this.setState({
			editApp: app
		});
	}

	render() {
		const { data } = this.state;
		return !this.state.editApp ? (
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
						Header: () => <strong>PORT</strong>,
						id: 'appPort',
						accessor: d => d.port,
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
						accessor: d => d,
						Cell: row => (
							<EditAppRow
								onClick={() => {
									this.handleEditClick(row.value);
								}}
							>
								<Edit size={18} />
							</EditAppRow>
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
		) : (
			<EditAppForm
				app={this.state.editApp}
				updateApp={this.props.updateApp}
				fetchAppsList={this.props.fetchAppsList}
			/>
		);
	}
}
