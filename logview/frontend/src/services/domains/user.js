import api from '../adapter';

export default {
	addUser: user => {
		return api.makeRequest(`/api/users`, api.requestType.POST, user);
	},
	updateUser: user => {
		return api.makeRequest(
			`/api/users/${user._id}`,
			api.requestType.PATCH,
			user
		);
	},
	deleteUser: id => {
		return api.makeRequest(`/api/users/${id}`, api.requestType.DELETE);
	},
	fetchUser: id => {
		return api.makeRequest(`/api/users/${id}`, api.requestType.GET);
	}
};
