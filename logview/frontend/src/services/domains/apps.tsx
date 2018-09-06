import api from '../adapter';
import { AppsState } from '../../types/AppsState';

export default {
	addNewApp: (newApp: string) => {
		return api.makeRequest(`/api/app`, api.requestType.POST, {
			name: newApp
		});
	},
	deleteApp: (appId: string) => {
		return api.makeRequest(`/api/app/${appId}`, api.requestType.DELETE);
	},
	updateApp: (app: AppsState) => {
		return api.makeRequest(`/api/app/${app.id}`, api.requestType.PUT, app);
	},
	getAllApps: () => {
		return api.makeRequest(`/api/app`, api.requestType.GET);
	}
};
