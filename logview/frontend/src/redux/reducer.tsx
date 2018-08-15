import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import { userReducer, fetchingState } from 'src/redux/user/reducer';
import {
	logReducer,
	fetchingState as fetchingLog
} from 'src/redux/log/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	logs: logReducer,
	fetching: fetchingState,
	fetchingLog: fetchingLog
});
