import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import { cpuLogsReducer, memoryLogsReducer } from 'src/redux/logs/reducer';
import { userReducer, fetchingState, isLoggedInState } from './user/reducer';
import { settingsReducer, fetchingSettingsReducer } from './settings/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	settings: settingsReducer,
	fetchingSettingsStatus: fetchingSettingsReducer,
	fetchingUserStatus: fetchingState,
	cpuLogs: cpuLogsReducer,
	memoryLogs: memoryLogsReducer,
	isLoggedIn: isLoggedInState
});
