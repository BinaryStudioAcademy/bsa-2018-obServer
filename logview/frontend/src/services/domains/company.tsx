import api from '../adapter';

export default {
	getCompanyUsers: () => {
		return api.makeRequest(`/api/user/company/users`, api.requestType.GET);
	},
	userChangeCompany: (id: string) => {
		return api.makeRequest(`api/user/invite/${id}`, api.requestType.GET);
	}
};
