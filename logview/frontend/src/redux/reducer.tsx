import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import {
	cpuLogsReducer,
	memoryLogsReducer,
	httpStatsReducer,
	fetchingLogsReducer,
	logMessagesReducer,
	filtersReducer,
	notificationReducer
} from './logs/reducer';
import { userReducer, fetchingState, isLoggedInState } from './user/reducer';
import { settingsReducer, fetchingSettingsReducer } from './settings/reducer';
import { appsReducer, fetchingAppsReducer } from './apps/reducer';
import { serverReducer, fetchingServerReducer } from './server/reducer';
import { companyReducer, companyChangeReducer } from './company/reducer';
import { socketsReducer } from './sockets/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	companyUsers: companyReducer,
	settings: settingsReducer,
	apps: appsReducer,
	server: serverReducer,
	cpuLogs: cpuLogsReducer,
	memoryLogs: memoryLogsReducer,
	httpStats: httpStatsReducer,
	sockets: socketsReducer,
	fetchingUserStatus: fetchingState,
	fetchingSettingsStatus: fetchingSettingsReducer,
	fetchingAppsStatus: fetchingAppsReducer,
	fetchingServerStatus: fetchingServerReducer,
	fetchingLogsStatus: fetchingLogsReducer,
	isLoggedIn: isLoggedInState,
	logMessages: logMessagesReducer,
	filters: filtersReducer,
	userChangeCompany: companyChangeReducer,
	notificationLogs: notificationReducer
});
