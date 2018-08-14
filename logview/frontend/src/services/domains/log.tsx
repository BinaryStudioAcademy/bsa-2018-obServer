import api from 'src/services/adapter';

export default {
	fetchLogs: () => {
		return api.makeRequest(`/api/logs`, api.requestType.GET);
	}
};
