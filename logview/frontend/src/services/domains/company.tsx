import api from 'src/services/adapter';

export default {
	getCompanyUsers: () => {
		return api.makeRequest(`/api/user/company/users`, api.requestType.GET);
	}
};
