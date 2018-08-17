import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import { userReducer, fetchingState } from 'src/redux/user/reducer';
import {
	logReducer,
	logsReducer,
	fetchingState as fetchingLog
} from 'src/redux/log/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	fetchingUserStatus: fetchingState,
	logs: logsReducer,
	log: logReducer,
	fetchingLogStatus: fetchingLog
});
