import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import {
	cpuLogsReducer,
	memoryLogsReducer,
	httpStatsReducer,
	fetchingLogsReducer,
	logMessagesReducer,
	activeAppReducer,
	timeRangeReducer,
	logLevelsReducer,
	notificationReducer
} from './logs/reducer';
import { userReducer, fetchingState, isLoggedInState } from './user/reducer';
import { settingsReducer, fetchingSettingsReducer } from './settings/reducer';
import { companyReducer } from './company/reducer';
import { socketsReducer } from './sockets/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	companyUsers: companyReducer,
	fetchingSettingsStatus: fetchingSettingsReducer,
	settings: settingsReducer,
	fetchingUserStatus: fetchingState,
	cpuLogs: cpuLogsReducer,
	memoryLogs: memoryLogsReducer,
	httpStats: httpStatsReducer,
	logMessages: logMessagesReducer,
	activeApp: activeAppReducer,
	timeRange: timeRangeReducer,
	logLevels: logLevelsReducer,
	fetchingLogsStatus: fetchingLogsReducer,
	isLoggedIn: isLoggedInState,
	sockets: socketsReducer,
	notificationLogs: notificationReducer
});
