export interface CpuLogState {
	logType: string;
	cores: [
		{
			coreLoadPercentages: number;
			coreName: string;
		}
	];
	totalLoadPercentage: number;
	timestamp: string;
	companyId: string;
	companyToken: string;
}
export interface MemoryLogState {
	companyId: string;
	companyToken: string;
	allMemory: number;
	freeMemory: number;
	freeMemoryPercentage: number;
	logType: string;
	timestamp: string;
}
export interface HttpStatsState {
	logType: string;
	timestamp: string;
	data: {
		route: string;
		method: string;
		responseTimeMin: number;
		responseTimeMax: number;
		responseTimeAvg: number;
		bodySizeRequest: number;
		bodySizeResponse: number;
		requestsCount: number;
	};
}

export interface LogMessagesState {
	appId: string;
	timestamp: string;
	logLevel: number;
	message: string;
}
