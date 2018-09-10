import api from '../adapter';

export default {
	resoucesAverages: (headers: any) => {
		return api.makeRequest(
			`/api/logs?serverMemoryInterval=3600000?serverCpuInterval=50000`,
			api.requestType.GET,
			{ headers: headers }
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
	},
	getLogMessages: (headers: any) => {
		return api.makeRequest(
			`/api/logs?logMessageInterval=36000000`,
			api.requestType.GET,
			{ headers: headers }
		);
	}
};
