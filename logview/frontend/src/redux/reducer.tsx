import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import { userReducer, fetchingState } from './user/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	fetchingUserStatus: fetchingState
});
