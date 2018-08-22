import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import { userReducer, fetchingState, isLoggedInState } from './user/reducer';
import { settingsReducer } from './settings/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	settings: settingsReducer,
	fetchingUserStatus: fetchingState,
	isLoggedIn: isLoggedInState
});
