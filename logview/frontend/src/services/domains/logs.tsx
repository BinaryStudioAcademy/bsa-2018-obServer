import api from 'src/services/logsAdapter';

export default {
	resoucesAverages: (headers: any) => {
		return api.makeRequest(
			`/api/logs?serverMemoryInterval=3600000?serverCpuInterval=50000`,
			api.requestType.GET,
			{ 'headers': headers }
		);
	}
};
