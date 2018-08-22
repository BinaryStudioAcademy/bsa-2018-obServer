import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import { userReducer, fetchingState, isLoggedInState } from './user/reducer';
import { companyReducer } from './company/reducer';

export default combineReducers<StoreState>({
	user: userReducer,
	companyUsers: companyReducer,
	fetchingUserStatus: fetchingState,
	isLoggedIn: isLoggedInState
});
