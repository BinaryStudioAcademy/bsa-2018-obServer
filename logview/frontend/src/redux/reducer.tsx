import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import { cpuLogsReducer, memoryLogsReducer } from 'src/redux/logs/reducer';
import { userReducer, fetchingState, isLoggedInState } from './user/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	fetchingUserStatus: fetchingState,
	cpuLogs: cpuLogsReducer,
	memoryLogs: memoryLogsReducer,
	isLoggedIn: isLoggedInState
});
