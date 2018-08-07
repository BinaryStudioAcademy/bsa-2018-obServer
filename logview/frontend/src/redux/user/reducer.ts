import { USER_REGISTER, USER_LOGIN } from './constants';
import { UserAction } from './actions';
import { UserState } from '../../types/UserState';
import { defaultState } from '../defaultState';

export function userReducer(
	state: UserState = defaultState.user,
	action: UserAction
): UserState {
	switch (action.type) {
		case USER_ENTER:
			return { ...state, 
				login: action.login,
				email: action.email,
			 };
		case USER_UPDATE_PROFILE: 

		default:
			return state;
	}
}
