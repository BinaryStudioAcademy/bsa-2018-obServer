import api from '../adapter';

export default {
	registerUser: (user: any) => {
		return api.makeRequest(`/api/register`, api.requestType.POST, user);
	},
	loginUser: (user: any) => {
		return api.makeRequest(`/api/login`, api.requestType.POST, user);
	},
	logoutUser: () => {
		return api.makeRequest(`/api/logout`, api.requestType.GET);
	},
	updateUser: (user: any) => {
		return api.makeRequest(
			`/api/users/${user._id}`,
			api.requestType.PUT,
			user
		);
	},
	deleteUser: (id: string | number) => {
		return api.makeRequest(`/api/users/${id}`, api.requestType.DELETE);
	},
	fetchUser: (id: string | number) => {
		return api.makeRequest(`/api/users/${id}`, api.requestType.GET);
	}
};
