import * as constants from './constants';
import {
	UserState,
	UserLoginState,
	UserResetPasswordState,
	UserChangePasswordState
} from '../../types/UserState';

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

/* user logout 
extends UserLoginState */
export interface UserLogout {
	type: constants.USER_LOGOUT;
}

export interface UserLogoutFail {
	type: constants.USER_LOGOUT_FAILED;
}

export interface UserLogoutSuccess {
	type: constants.USER_LOGOUT_SUCCESS;
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
	activationToken: string;
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

/* user invite */
export interface UserInvite {
	type: constants.USER_INVITE;
	email: string;
	name: string;
}

export interface UserInviteFail {
	type: constants.USER_INVITE_FAILED;
}

export interface UserInviteSuccess {
	type: constants.USER_INVITE_SUCCESS;
}

/* user set password */
export interface UserSetPassword extends UserChangePasswordState {
	type: constants.USER_SET_PASSWORD;
}

export interface UserSetPasswordFail {
	type: constants.USER_SET_PASSWORD_FAILED;
}

export interface UserSetPasswordSuccess {
	type: constants.USER_SET_PASSWORD_SUCCESS;
}

export type UserAction =
	| UserRegister
	| UserRegisterFail
	| UserRegisterSuccess
	| UserLogin
	| UserLoginFail
	| UserLoginSuccess
	| UserLogout
	| UserLogoutFail
	| UserLogoutSuccess
	| UserChangePassword
	| UserChangePasswordFail
	| UserChangePasswordSuccess
	| UserResetPassword
	| UserResetPasswordFail
	| UserResetPasswordSuccess
	| UserEmailActivation
	| UserEmailActivationFail
	| UserEmailActivationSuccess
	| UserInvite
	| UserInviteFail
	| UserInviteSuccess
	| UserSetPassword
	| UserSetPasswordFail
	| UserSetPasswordSuccess
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

export function userLogout(): UserLogout {
	return {
		type: constants.USER_LOGOUT
	};
}

export function userLogoutFail(): UserLogoutFail {
	return {
		type: constants.USER_LOGOUT_FAILED
	};
}

export function userLogoutSuccess(): UserLogoutSuccess {
	return {
		type: constants.USER_LOGOUT_SUCCESS
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

export function userEmailActivation(
	activationToken: string = ''
): UserEmailActivation {
	return {
		type: constants.USER_EMAIL_ACTIVATION,
		activationToken
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

export function userInvite(email: string = '', name: string = '') {
	return {
		type: constants.USER_INVITE,
		email,
		name
	};
}

export function userInviteFail(): UserInviteFail {
	return {
		type: constants.USER_INVITE_FAILED
	};
}

export function userInviteSuccess(): UserInviteSuccess {
	return {
		type: constants.USER_INVITE_SUCCESS
	};
}

export function userSetPassword(
	newPassword: string = '',
	resetToken: string = ''
): UserSetPassword {
	return {
		type: constants.USER_SET_PASSWORD,
		newPassword,
		resetToken
	};
}

export function userSetPasswordFail(): UserSetPasswordFail {
	return {
		type: constants.USER_SET_PASSWORD_FAILED
	};
}

export function userSetPasswordSuccess(): UserSetPasswordSuccess {
	return {
		type: constants.USER_SET_PASSWORD_SUCCESS
	};
}
