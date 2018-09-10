import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAppsList } from '../../redux/apps/actions';
import { handleActiveApp } from 'src/redux/logs/actions';
import { AppsState } from '../../types/AppsState';
// import { FiltersState } from 'src/types/LogsState';
import Select from '../../components/Select/Select';
import { convertAppsDataToSelect } from '../../services/reduxDataParser';

interface AppsSelectorState {}

interface AppsSelectorProps extends RouteComponentProps<{}, {}> {
	actions: {
		fetchAppsList: Function;
		handleActiveApp: Function;
	};
	apps: Array<AppsState>;
	// filters: FiltersState;
}

class AppsSelector extends React.Component<
	AppsSelectorProps,
	AppsSelectorState
> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		this.props.actions.fetchAppsList();
	}

	render() {
		return (
			<React.Fragment>
				{this.props.apps && (
					<Select
						onActive={e =>
							this.props.actions.handleActiveApp(
								this.props.apps.filter(app => app.name === e)[0]
									.id
							)
						}
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
