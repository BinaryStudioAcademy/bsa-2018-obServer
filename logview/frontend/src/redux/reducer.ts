import { combineReducers } from 'redux';
import { StoreState } from '../types/StoreState';
import { userReducer } from './user/reducer';

export default combineReducers<StoreState>({
	user: userReducer
});
