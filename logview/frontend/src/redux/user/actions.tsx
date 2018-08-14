import * as constants from './constants';
import {
	UserState,
	UserLoginState,
	UserResetPasswordState,
	UserChangePasswordState
} from '../../types/UserState';
import { func } from '../../../../node_modules/@types/prop-types';

/* user register */
export interface UserRegister extends UserState {
	type: constants.USER_REGISTER;
}

export interface UserRegisterFail {
	type: constants.USER_REGISTER_FAILED;
}

export interface UserRegisterSuccess {
	type: constants.USER_REGISTER_SUCCESS;
}

/* user login */
export interface UserLogin extends UserLoginState {
	type: constants.USER_LOGIN;
}

export interface UserLoginFail {
	type: constants.USER_LOGIN_FAILED;
}

export interface UserLoginSuccess {
	type: constants.USER_LOGIN_SUCCESS;
}

/* password reset */
export interface UserResetPassword extends UserResetPasswordState {
	type: constants.USER_RESET_PASSWORD;
}

export interface UserResetPasswordFail {
	type: constants.USER_RESET_PASSWORD_FAILED;
}

export interface UserResetPasswordSuccess {
	type: constants.USER_RESET_PASSWORD_SUCCESS;
}

/* password change */
export interface UserChangePassword extends UserChangePasswordState {
	type: constants.USER_CHANGE_PASSWORD;
}

export interface UserChangePasswordFail {
	type: constants.USER_CHANGE_PASSWORD_FAILED;
}

export interface UserChangePasswordSuccess {
	type: constants.USER_CHANGE_PASSWORD_SUCCESS;
}

/* email activation */
export interface UserEmailActivation {
	type: constants.USER_EMAIL_ACTIVATION;
	token: string;
}

export interface UserEmailActivationFail {
	type: constants.USER_EMAIL_ACTIVATION_FAILED;
}

export interface UserEmailActivationSuccess {
	type: constants.USER_EMAIL_ACTIVATION_SUCCESS;
}

export interface FetchUser {
	type: constants.FETCH_USER;
}

export type UserAction =
	| UserRegister
	| UserRegisterFail
	| UserRegisterSuccess
	| UserLogin
	| UserLoginFail
	| UserLoginSuccess
	| UserChangePassword
	| UserChangePasswordFail
	| UserChangePasswordSuccess
	| UserResetPassword
	| UserResetPasswordFail
	| UserResetPasswordSuccess
	| UserEmailActivation
	| UserEmailActivationFail
	| UserChangePasswordSuccess
	| FetchUser;

export function userRegister(
	name: string = '',
	email: string = '',
	password: string = '',
	company: string = ''
): UserRegister {
	return {
		type: constants.USER_REGISTER,
		name,
		email,
		password,
		company
	};
}

export function userRegisterFail(): UserRegisterFail {
	return {
		type: constants.USER_REGISTER_FAILED
	};
}

export function userRegisterSuccess(): UserRegisterSuccess {
	return {
		type: constants.USER_REGISTER_SUCCESS
	};
}

export function userLogin(
	email: string = '',
	password: string = ''
): UserLogin {
	return {
		type: constants.USER_LOGIN,
		email,
		password
	};
}

export function userLoginFail(): UserLoginFail {
	return {
		type: constants.USER_LOGIN_FAILED
	};
}

export function userLoginSuccess(): UserLoginSuccess {
	return {
		type: constants.USER_LOGIN_SUCCESS
	};
}

export function userResetPassword(
	email: string = '',
	password: string = ''
): UserResetPassword {
	return {
		type: constants.USER_RESET_PASSWORD,
		email
	};
}

export function userResetPasswordFail(): UserResetPasswordFail {
	return {
		type: constants.USER_RESET_PASSWORD_FAILED
	};
}

export function userResetPasswordSuccess(): UserResetPasswordSuccess {
	return {
		type: constants.USER_RESET_PASSWORD_SUCCESS
	};
}

export function userChangePassword(
	newPassword: string = '',
	resetToken: string = ''
): UserChangePassword {
	return {
		type: constants.USER_CHANGE_PASSWORD,
		newPassword,
		resetToken
	};
}

export function userChangePasswordFail(): UserChangePasswordFail {
	return {
		type: constants.USER_CHANGE_PASSWORD_FAILED
	};
}

export function userChangePasswordSuccess(): UserChangePasswordSuccess {
	return {
		type: constants.USER_CHANGE_PASSWORD_SUCCESS
	};
}

export function fetchUser(): FetchUser {
	return {
		type: constants.FETCH_USER
	};
}

export function userEmailActivation(token: 'string'): UserEmailActivation {
	return {
		type: constants.USER_EMAIL_ACTIVATION,
		token
	};
}

export function userEmailActivationFail(): UserEmailActivationFail {
	return {
		type: constants.USER_EMAIL_ACTIVATION_FAILED
	};
}

export function userEmailActivationSuccess(): UserEmailActivationSuccess {
	return {
		type: constants.USER_EMAIL_ACTIVATION_SUCCESS
	};
}
