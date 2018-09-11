export interface UserState {
	name?: string;
	email?: string;
	company?: string;
	companyId?: string;
}

export interface UserRegisterState {
	name?: string;
	email?: string;
	password?: string;
	company?: string;
}

export interface UserLoginState {
	email: string;
	password: string;
}

export interface IsLoggedInState {
	isLoggedIn: boolean;
}

export interface UserResetPasswordState {
	email: string;
}

export interface UserChangePasswordState {
	newPassword: string;
	resetToken: string;
}

export interface UserActivationState {
	activationToken: string;
}

export interface FetchingState {
	fetching: string;
}

export interface InviteUserState {
	email: string;
	name: string;
	admin: boolean;
}
