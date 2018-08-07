import api from '../adapter';

export default {
	addUser: (user: any) => {
		return api.makeRequest(`/api/users`, api.requestType.POST, user);
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
