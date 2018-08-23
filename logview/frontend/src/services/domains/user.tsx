import api from 'src/services/adapter';
import {
	UserState,
	UserLoginState,
	UserActivationState,
	UserResetPasswordState,
	UserChangePasswordState,
	InviteUserState
} from '../../types/UserState';

export default {
	registerUser: (user: UserState) => {
		return api.makeRequest(`/api/user`, api.requestType.POST, user);
	},
	loginUser: (loginData: UserLoginState) => {
		return api.makeRequest(`/api/login`, api.requestType.POST, loginData);
	},
	logoutUser: () => {
		return api.makeRequest(`/api/logout`, api.requestType.GET);
	},
	updateUser: (id: string, updatedData: UserState) => {
		return api.makeRequest(
			`/api/user/${id}`,
			api.requestType.PUT,
			updatedData
		);
	},
	updateLoggedInUser: (updatedData: UserState) => {
		return api.makeRequest(
			`/api/user/current/loggedin`,
			api.requestType.PUT,
			updatedData
		);
	},
	fetchUser: (id: string) => {
		return api.makeRequest(`/api/user/${id}`, api.requestType.GET);
	},
	fetchLoggedInUser: () => {
		return api.makeRequest(
			`/api/user/current/loggedin`,
			api.requestType.GET
		);
	},
	resetPasswordEmail: (email: UserResetPasswordState) => {
		return api.makeRequest(
			`/api/user/resetpassword`,
			api.requestType.POST,
			email
		);
	},
	changePassword: (
		resetToken: string,
		newPassword: UserChangePasswordState
	) => {
		return api.makeRequest(
			`/api/user/changepassword/${resetToken}`,
			api.requestType.POST,
			newPassword
		);
	},
	activateUser: (UserActivationState: UserActivationState) => {
		return api.makeRequest(
			`/api/user/activate/${UserActivationState.activationToken}`,
			api.requestType.POST,
			UserActivationState
		);
	},
	inviteUser: (invite: InviteUserState) => {
		return api.makeRequest(
			`/api/user/invite/`,
			api.requestType.POST,
			invite
		);
	},
	userSetPassword: (
		setToken: string,
		newPassword: UserChangePasswordState
	) => {
		return api.makeRequest(
			`/api/user/invite/${setToken}`,
			api.requestType.POST,
			newPassword
		);
	}
};
