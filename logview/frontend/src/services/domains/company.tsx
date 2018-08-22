import api from 'src/services/adapter';

export default {
	registerUser: () => {
		return api.makeRequest(`/api/user/company/users`, api.requestType.GET);
	}
};
