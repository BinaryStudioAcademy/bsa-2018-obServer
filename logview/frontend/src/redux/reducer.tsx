import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import { userReducer, fetchingState, isLoggedInState } from './user/reducer';
import { settingsReducer, fetchingSettingsReducer } from './settings/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	settings: settingsReducer,
	fetchingSettingsStatus: fetchingSettingsReducer,
	fetchingUserStatus: fetchingState,
	isLoggedIn: isLoggedInState
});
