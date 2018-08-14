import api from 'src/services/adapter';
import { LogState } from '../../types/LogState';

export default {
	fetchLogs: () => {
		return api.makeRequest(`/api/logs`, api.requestType.GET);
	}
};
