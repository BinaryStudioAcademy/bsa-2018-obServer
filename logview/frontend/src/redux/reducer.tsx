import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import {
	logReducer,
	logsReducer,
	fetchingState as fetchingLog
} from 'src/redux/log/reducer';
import { userReducer, fetchingState, isLoggedInState } from './user/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	fetchingUserStatus: fetchingState,
	logs: logsReducer,
	log: logReducer,
	fetchingLogStatus: fetchingLog,
	isLoggedIn: isLoggedInState
});
