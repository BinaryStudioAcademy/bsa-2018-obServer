import api from 'src/services/adapter';
import { httpStats } from 'src/containers/HttpStats/mockData';

export default {
	resoucesAverages: (companyId: string) => {
		return api.makeRequest(
			`/api/logs/?serverMemoryInterval=3600000?serverCpuInterval=50000`,
			api.requestType.GET,
			companyId
		);
	},
	getHttpStats: (companyId: string, appId: string, interval: number) => {
		let headers = {};
		headers['X-COMPANY-TOKEN'] = companyId;
		headers['X-APP-ID'] = appId;

		return api.makeRequest(
			`/api/logs/?httpInterval=${interval}`,
			api.requestType.GET,
			{ headers }
		);
	}
};
