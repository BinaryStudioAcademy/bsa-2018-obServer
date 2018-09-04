import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import {
	cpuLogsReducer,
	memoryLogsReducer,
	httpStatsReducer,
	fetchingLogsReducer
} from './logs/reducer';
import { userReducer, fetchingState, isLoggedInState } from './user/reducer';
import { settingsReducer, fetchingSettingsReducer } from './settings/reducer';
import { companyReducer } from './company/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	companyUsers: companyReducer,
	fetchingSettingsStatus: fetchingSettingsReducer,
	settings: settingsReducer,
	fetchingUserStatus: fetchingState,
	cpuLogs: cpuLogsReducer,
	memoryLogs: memoryLogsReducer,
	httpStats: httpStatsReducer,
	fetchingLogsStatus: fetchingLogsReducer,
	isLoggedIn: isLoggedInState
});
