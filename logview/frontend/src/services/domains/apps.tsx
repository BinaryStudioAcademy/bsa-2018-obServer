import api from '../adapter';
import { AppsState } from '../../types/AppsState';

export default {
	addNewApp: (newAppName: string, newAppPort: number) => {
		return api.makeRequest(`/api/app`, api.requestType.POST, {
			name: newAppName,
			port: +newAppPort
		});
	},
	deleteApp: (appId: string) => {
		return api.makeRequest(`/api/app/${appId}`, api.requestType.DELETE);
	},
	updateApp: (app: AppsState) => {
		console.log('eeee', app);
		return api.makeRequest(`/api/app/${app.id}`, api.requestType.PUT, {
			name: app.name,
			port: app.port
		});
	},
	getAllApps: () => {
		return api.makeRequest(`/api/app`, api.requestType.GET);
	}
};
