import api from 'src/services/adapter';

export default {
	resoucesAverages: (companyId: string) => {
		return api.makeRequest(
			`/api/logs/?serverMemoryInterval=3600000?serverCpuInterval=50000`,
			api.requestType.GET,
			companyId
		);
	}
};
