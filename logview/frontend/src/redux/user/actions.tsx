import * as constants from './constants';
import {
	UserState,
	UserRegisterState,
	UserLoginState,
	UserResetPasswordState,
	UserChangePasswordState
} from '../../types/UserState';

/* user register */
export interface UserRegister extends UserRegisterState {
	type: constants.USER_REGISTER;
}

export interface UserRegisterFail {
	type: constants.USER_REGISTER_FAILED;
}

export interface UserRegisterSuccess {
	type: constants.USER_REGISTER_SUCCESS;
	payload: UserState;
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
	payload: UserLoginState;
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

/* user invite */
export interface UserInvite {
	type: constants.USER_INVITE;
	email: string;
	name: string;
	admin: boolean;
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

/* fetch user */
export interface FetchUser {
	type: constants.FETCH_USER;
}

export interface FetchUserFail {
	type: constants.FETCH_USER_FAILED;
}

export interface FetchUserSuccess {
	type: constants.FETCH_USER_SUCCESS;
	payload: UserState;
}

/* change(update) user */
export interface ChangeUser extends UserState {
	type: constants.CHANGE_USER;
}

export interface ChangeUserFail {
	type: constants.CHANGE_USER_FAILED;
}

export interface ChangeUserSuccess {
	type: constants.CHANGE_USER_SUCCESS;
	payload: UserState;
}

/* user logout */
export interface UserLogout extends UserResetPasswordState {
	type: constants.USER_LOGOUT;
}

export interface UserLogoutFail {
	type: constants.USER_LOGOUT_FAILED;
}

export interface UserLogoutSuccess {
	type: constants.USER_LOGOUT_SUCCESS;
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
	| UserEmailActivationSuccess
	| UserInvite
	| UserInviteFail
	| UserInviteSuccess
	| UserSetPassword
	| UserSetPasswordFail
	| UserSetPasswordSuccess
	| FetchUser
	| FetchUserFail
	| FetchUserSuccess
	| ChangeUser
	| ChangeUserFail
	| ChangeUserSuccess
	| UserLogout
	| UserLogoutFail
	| UserLogoutSuccess;

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

export function userChange(
	name: string = '',
	email: string = '',
	company: string = '',
	companyId: string = ''
): ChangeUser {
	return {
		type: constants.CHANGE_USER,
		name,
		email,
		company,
		companyId
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

export function userResetPassword(
	email: string = '',
	password: string = ''
): UserResetPassword {
	return {
		type: constants.USER_RESET_PASSWORD,
		email
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

export function userInvite(email: string = '', name: string = '', admin: boolean = false) {
	return {
		type: constants.USER_INVITE,
		email,
		name,
		admin
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

export function userLogout(email: string): UserLogout {
	return {
		type: constants.USER_LOGOUT,
		email
	};
}
