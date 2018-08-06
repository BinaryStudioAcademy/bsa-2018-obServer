import { USER_SET_EMAIL } from './constants';
import { UserAction } from './actions';
import { UserState } from '../../types/UserState';
import { defaultState } from '../defaultState';

export function userReducer(state: UserState = defaultState.user, action: UserAction): UserState {
	switch (action.type) {
		case USER_SET_EMAIL:
			return { ...state, email: action.email };
		default:
			return state;
	}
}