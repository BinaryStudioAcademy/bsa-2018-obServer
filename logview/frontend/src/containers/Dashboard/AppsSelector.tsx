import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAppsList } from '../../redux/apps/actions';
import { handleActiveApp } from '../../redux/logs/actions';
import { AppsState } from '../../types/AppsState';
import { FiltersState } from '../../types/LogsState';
import Select from '../../components/Select/Select';
import { convertAppsDataToSelect } from '../../services/reduxDataParser';

interface AppsSelectorState {}

interface AppsSelectorProps extends RouteComponentProps<{}, {}> {
	actions: {
		fetchAppsList: Function;
		handleActiveApp: Function;
	};
	apps: Array<AppsState>;
	filters: FiltersState;
}

class AppsSelector extends React.Component<
	AppsSelectorProps,
	AppsSelectorState
> {
	constructor(props: any) {
		super(props);
		this.onActive = this.onActive.bind(this);
	}

	onActive(name, value) {
		this.props.actions.handleActiveApp({
			name,
			value
		});
	}

	componentDidMount() {
		this.props.actions.fetchAppsList();
	}

	render() {
		const name = this.props.filters.activeApp
			? this.props.filters.activeApp.name
			: 'choose app';
		return (
			<React.Fragment>
				{this.props.apps && (
					<Select
						active={name}
						onActive={this.onActive}
						options={convertAppsDataToSelect(this.props.apps)}
					/>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ apps, filters }) => ({
	apps,
	filters
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ fetchAppsList, handleActiveApp }, dispatch)
});

const AppsSelectorConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppsSelector);

export default AppsSelectorConnected;
