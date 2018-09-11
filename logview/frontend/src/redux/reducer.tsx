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
import { USER_LOGOUT } from './user/constants'; // USER_LOGOUT_SUCCESS

// till testing LOG_OUT state nulling, if that is OK - delete this

// export default combineReducers<StoreState>({
// 	user: userReducer,
// 	companyUsers: companyReducer,
// 	settings: settingsReducer,
// 	apps: appsReducer,
// 	server: serverReducer,
// 	cpuLogs: cpuLogsReducer,
// 	memoryLogs: memoryLogsReducer,
// 	httpStats: httpStatsReducer,
// 	sockets: socketsReducer,
// 	fetchingUserStatus: fetchingState,
// 	fetchingSettingsStatus: fetchingSettingsReducer,
// 	fetchingAppsStatus: fetchingAppsReducer,
// 	fetchingServerStatus: fetchingServerReducer,
// 	fetchingLogsStatus: fetchingLogsReducer,
// 	isLoggedIn: isLoggedInState,
// 	logMessages: logMessagesReducer,
// 	filters: filtersReducer,
// 	userChangeCompany: companyChangeReducer,
// 	notificationLogs: notificationReducer
// });

const appReducer = combineReducers<StoreState>({
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

const rootReducer = (state, action) => {
	if (action.type === USER_LOGOUT) {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
