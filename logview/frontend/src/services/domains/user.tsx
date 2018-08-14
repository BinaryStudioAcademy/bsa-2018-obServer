import api from 'src/services/adapter';
import {
	UserState,
	UserLoginState,
	UserResetPasswordState,
	UserChangePasswordState
} from '../../types/UserState';

export default {
	registerUser: (user: UserState) => {
		return api.makeRequest(`/api/user`, api.requestType.POST, user);
	},
	loginUser: (loginData: UserLoginState) => {
		return api.makeRequest(`/api/login`, api.requestType.POST, loginData);
	},
	logoutUser: () => {
		return api.makeRequest(`/api/logout`, api.requestType.POST);
	},
	updateUser: (id: string, updatedData: UserState) => {
		return api.makeRequest(
			`/api/user/${id}`,
			api.requestType.PUT,
			updatedData
		);
	},
	fetchUser: (id: string) => {
		return api.makeRequest(`/api/user/${id}`, api.requestType.GET);
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
	activateUser: (activationToken: string) => {
		return api.makeRequest(
			`/api/user/activate/${activationToken}`,
			api.requestType.POST
		);
	}
};
