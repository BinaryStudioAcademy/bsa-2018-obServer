import api from 'src/services/adapter';

export default {
	registerUser: (user: any) => {
		return api.makeRequest(`/api/register`, api.requestType.POST, user);
	},
	loginUser: (user: any) => {
		return api.makeRequest(`/api/login`, api.requestType.POST, user);
	},
	logoutUser: () => {
		return api.makeRequest(`/api/logout`, api.requestType.POST);
	},

	updateUser: (user: any) => {
		return api.makeRequest(
			`/api/user/${user._id}`,
			api.requestType.PUT,
			user
		);
	},
	deleteUser: (id: string | number) => {
		return api.makeRequest(`/api/user/${id}`, api.requestType.DELETE);
	},
	fetchUser: (id: string | number) => {
		return api.makeRequest(`/api/user/${id}`, api.requestType.GET);
	}
};
