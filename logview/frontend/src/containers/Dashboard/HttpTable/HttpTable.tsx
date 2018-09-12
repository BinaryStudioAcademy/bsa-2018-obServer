import * as React from 'react';
import { TableWrapper } from '../../HttpStats/HttpStatsStyles';
import HttpTabelDemo from '../../../components/tabels/httpTabelDemo';
import { httpParser, convertTimeRangeToInterval } from '../../../services/chartParser';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNewHttpStats } from 'src/redux/logs/actions';
import { AppsState } from '../../../types/AppsState';
import { FiltersState } from '../../../types/LogsState';

interface HttpStatsProps {
	actions: { getNewHttpStats: Function };
	httpStats: Array<HttpStatsState>;
	fetchingLogsStatus: string;
	filters: FiltersState;
	apps: Array<AppsState>;
}


interface HttpStatsState {}

class HttpTable extends React.Component<HttpStatsProps, HttpStatsState> {
    constructor(props: HttpStatsProps) {
		super(props);
    }
    
    componentDidMount() {
		const activeApp = this.props.filters.activeApp;
		activeApp &&
			this.props.actions.getNewHttpStats(
				activeApp.value,
				convertTimeRangeToInterval(
					this.props.filters.timeRanges.requests
				)
			);
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.filters.activeApp !== this.props.filters.activeApp ||
			nextProps.filters.timeRanges.requests !==
				this.props.filters.timeRanges.requests
		) {
			const activeApp = nextProps.filters.activeApp;
			activeApp &&
				this.props.actions.getNewHttpStats(
					activeApp.value,
					convertTimeRangeToInterval(
						this.props.filters.timeRanges.requests
					)
				);
		}
    }
    
    render() {
        console.log(httpParser(this.props.httpStats));
        return (
            <TableWrapper>
                <HttpTabelDemo
                    data={httpParser(this.props.httpStats)}
                />
            </TableWrapper>
        )
    }
}

const mapStateToProps = ({ httpStats, fetchingLogsStatus, filters, apps }) => ({
	httpStats,
	fetchingLogsStatus,
	filters,
	apps
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ getNewHttpStats }, dispatch)
});

const HttpTableConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(HttpTable);

export default HttpTableConnected;
