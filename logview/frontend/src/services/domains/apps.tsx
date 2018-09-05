import api from '../adapter';

const appState = [
	{
		appName: 'app1',
		appId: 'app1ID'
	},
	{
		appName: 'app2',
		appId: 'app2ID'
	},
	{
		appName: 'app3',
		appId: 'app3ID'
	}
];

export default {
	addNewApp: () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(appState);
			}, 1000);
		});
	},
	deleteApp: () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(appState);
			}, 1000);
		});
		//return api.makeRequest(`/api/user/company/users`, api.requestType.GET);
	},
	updateApp: () => {
		//return api.makeRequest(`/api/user/company/users`, api.requestType.GET);
	},
	getAllApps: () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(appState);
			}, 1000);
		});
		//return api.makeRequest(`/api/user/company/users`, api.requestType.GET);
	}
};
