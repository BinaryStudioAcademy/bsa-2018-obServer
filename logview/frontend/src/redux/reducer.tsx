import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import { userReducer, fetchingState as fetchingUser } from './user/reducer';
import { logReducer, fetchingState as fetchingLog } from './log/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	logs: logReducer,
	fetchingUser: fetchingUser,
	fetchingLog: fetchingLog
});
