import api from 'src/services/adapter';
import { httpStats } from 'src/containers/HttpStats/mockData';

export default {
	resoucesAverages: (headers: any) => {
		return api.makeRequest(
			`/api/logs?serverMemoryInterval=3600000?serverCpuInterval=50000`,
			api.requestType.GET,
			{ headers: headers }
		);
	},
	getHttpStats: (companyId: string, appId: string) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(httpStats);
			}, 2000);
		});
		/* 	return api.makeRequest(
				`/api/logs/?serverMemoryInterval=3600000?serverCpuInterval=50000`,
				api.requestType.GET,
				companyId
			); */
	},
	getLogMessages: (companyId: any) => {
		return api.makeRequest(
			`/api/logs?logMessageInterval=36000000`,
			api.requestType.GET,
			{ headers: companyId }
		);
	}
};
