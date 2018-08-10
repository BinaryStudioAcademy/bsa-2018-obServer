import api from 'src/services/adapter';

export default {
	registerUser: (user: object) => {
		return api.makeRequest(`/api/user`, api.requestType.POST, user);
	},
	loginUser: (loginData: object) => {
		return api.makeRequest(`/api/login`, api.requestType.POST, loginData);
	},
	logoutUser: () => {
		return api.makeRequest(`/api/logout`, api.requestType.POST);
	},
	updateUser: (id: string, updatedData: object) => {
		return api.makeRequest(
			`/api/user/${id}`,
			api.requestType.PUT,
			updatedData
		);
	},
	deleteUser: (id: string) => {
		return api.makeRequest(`/api/user/${id}`, api.requestType.DELETE);
	},
	fetchUser: (id: string) => {
		return api.makeRequest(`/api/user/${id}`, api.requestType.GET);
	},
	resetPasswordEmail: (email: object) => {
		return api.makeRequest(
			`/api/user/resetpassword`,
			api.requestType.POST,
			email
		);
	},
	changePassword: (resetToken: string, newPassword: object) => {
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
