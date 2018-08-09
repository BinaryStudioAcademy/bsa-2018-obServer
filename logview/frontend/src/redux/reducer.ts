import { combineReducers } from 'redux';
import { StoreState } from 'src/types/StoreState';
import { userReducer } from './user/reducer';

export default combineReducers<StoreState>({
	user: userReducer
});
