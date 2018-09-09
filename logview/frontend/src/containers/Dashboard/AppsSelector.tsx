import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAppsList } from '../../redux/apps/actions';
import { AppsState } from '../../types/AppsState';
import Select from '../../components/Select/Select';
import { convertAppsDataToSelect } from '../../services/reduxDataParser';

interface AppsSelectorState {}

interface AppsSelectorProps extends RouteComponentProps<{}, {}> {
	actions: { fetchAppsList: Function };
	apps: Array<AppsState>;
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
						onActive={false}
						options={convertAppsDataToSelect(this.props.apps)}
					/>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ apps }) => ({
	apps
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ fetchAppsList }, dispatch)
});

const AppsSelectorConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppsSelector);

export default AppsSelectorConnected;
