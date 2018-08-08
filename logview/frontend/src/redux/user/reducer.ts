import {
	USER_REGISTER,
	USER_LOGIN,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILED,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILED
} from './constants';
import { UserAction } from './actions';
import { UserState } from '../../types/UserState';
import { defaultState } from '../defaultState';

export function userReducer(
	state: UserState = defaultState.user,
	action: UserAction
): UserState {
	switch (action.type) {
		case USER_REGISTER_SUCCESS:
			return {
				...state,
				id: action.id,
				companyId: action.companyId,
				name: action.name,
				email: action.email,
				password: ''
			};
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				id: action.id,
				companyId: action.companyId,
				name: action.name,
				email: action.email,
				password: ''
			};
		default:
			return state;
	}
}
