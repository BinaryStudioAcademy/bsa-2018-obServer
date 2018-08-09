import * as constants from './constants';
import { UserAction } from './actions';
import { UserState, UserLoginState } from '../../types/UserState';
import { defaultState } from '../defaultState';

export function userReducer(
	// loginState: UserLoginState = defaultState.userLogin,
	state: UserState = defaultState.user,
	action: UserAction
): UserState {
	console.log(action);
	switch (action.type) {
		case constants.USER_REGISTER:
			return {
				...state,
				company: action.company,
				name: action.name,
				email: action.email,
				password: action.password
			};
		// case constants.USER_LOGIN:
		// return {
		// ...loginState,
		// email: action.email,
		// password: action.password,
		// user: action.user
		// };
		default:
			return state;
	}
}

/*
export function fetchingState(
	state: UserState = defaultState.user,
	action: UserAction
): UserState {
	switch (action.type) {
		case constants.USER_REGISTER_SUCCESS:
		case constants.USER_LOGIN_SUCCESS:
		case constants.USER_CHANGE_PASSWORD_SUCCESS:
		case constants.USER_RESET_PASSWORD_SUCCESS:
			return {
				fetchingState: 'success';
			}
		case 

	}
}
*/
