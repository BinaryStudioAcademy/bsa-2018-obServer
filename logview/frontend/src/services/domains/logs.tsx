import api from '../adapter';
import { httpStats } from '../../containers/HttpStats/mockData';

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
	}
};
