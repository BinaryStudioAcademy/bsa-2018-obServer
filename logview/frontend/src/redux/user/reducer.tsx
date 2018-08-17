import * as constants from './constants';
import { UserAction } from './actions';
import { UserState } from 'src/types/UserState';
import { defaultState } from '../defaultState';

export function userReducer(
	state: UserState = defaultState.user,
	action: UserAction
): UserState {
	switch (action.type) {
		case constants.USER_REGISTER:
			return {
				...state,
				company: action.company,
				name: action.name,
				email: action.email,
				password: action.password
			};
		case constants.USER_LOGIN:
			return {
				...state,
				email: action.email,
				password: action.password
			};
		default:
			return state;
	}
}

export function fetchingState(state = 'unstarted', action: UserAction) {
	switch (action.type) {
		case constants.USER_REGISTER_SUCCESS:
		case constants.USER_LOGIN_SUCCESS:
		case constants.USER_RESET_PASSWORD_SUCCESS:
		case constants.USER_RESET_PASSWORD_SUCCESS:
		case constants.USER_EMAIL_ACTIVATION_SUCCESS:
			return 'success';
		case constants.USER_REGISTER_FAILED:
		case constants.USER_LOGIN_FAILED:
		case constants.USER_RESET_PASSWORD_FAILED:
		case constants.USER_RESET_PASSWORD_FAILED:
		case constants.USER_EMAIL_ACTIVATION_FAILED:
			return 'failed';
		case constants.USER_REGISTER:
		case constants.USER_LOGIN:
		case constants.USER_RESET_PASSWORD:
		case constants.USER_RESET_PASSWORD:
		case constants.USER_EMAIL_ACTIVATION:
			return 'pending';
		default:
			return state;
	}
}

export function fetchUser(
	state: UserState = defaultState.user,
	action: UserAction
) {}
