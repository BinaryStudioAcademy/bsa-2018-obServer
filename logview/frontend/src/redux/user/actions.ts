import {
	USER_REGISTER,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILED,
	USER_LOGIN,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILED,
	USER_RESET_PASSWORD,
	USER_RESET_PASSWORD_SUCCESS,
	USER_RESET_PASSWORD_FAILED,
	USER_RESET_CHANGE,
	USER_RESET_CHANGE_SECCESS,
	USER_RESET_CHANGE_FAILED
} from './constants';
import { UserState } from '../../types/UserState';

export interface UserRegister {
	type: USER_REGISTER | USER_REGISTER_FAILED;
	name: string;
	email: string;
	password: string;
	company: string;
}

export interface UserLogin {
	type: USER_LOGIN | USER_LOGIN_FAILED;
	email: string;
	password: string;
}

export interface UserSuccess extends UserState {
	type: USER_LOGIN_SUCCESS | USER_REGISTER_SUCCESS;
}

export type UserAction = UserRegister | UserLogin | UserSuccess;

export function userRegister(
	name: string = '',
	email: string = '',
	password: string = '',
	company: string = ''
): UserRegister {
	return {
		type: USER_REGISTER,
		name,
		email,
		password,
		company
	};
}

export function userLogin(
	email: string = '',
	password: string = ''
): UserLogin {
	return {
		type: USER_LOGIN,
		email,
		password
	};
}
