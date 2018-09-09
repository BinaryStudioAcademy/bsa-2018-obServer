import api from '../adapter';
import { ServerState } from '../../types/ServerState';

export default {
	updateSetting: (server: ServerState) => {
		return api.makeRequest(
			`/api/user/company/server`,
			api.requestType.PUT,
			{
				logcollectAddress: server.logcollectAddress,
				logcollectPort: server.logcollectPort
			}
		);
	},
	getSetting: () => {
		return api.makeRequest(`/api/user/company/server`, api.requestType.GET);
	}
};
