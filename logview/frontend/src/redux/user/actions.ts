import { USER_REGISTER, USER_LOGIN } from './constants';

export interface UserRegister {
	type: USER_REGISTER;
	login: string,
	email: string,
	password: string,
	confirmPassword: string
}

export interface UserLogin {
	type: USER_LOGIN;
	login: string,
	password: string,
}

export type UserAction = UserRegister | UserLogin;

export function userRegister(login: string = '', email: string = '', password: string = '', confirmPassword:string=''): UserRegister {
	return {
		type: USER_REGISTER,
		login,
		email,
		password,
		confirmPassword
	};
}

export function userLogin(login: string = '', password: string = ''): UserLogin {
	return {
		type: USER_LOGIN,
		login,
		password,
	};
}

