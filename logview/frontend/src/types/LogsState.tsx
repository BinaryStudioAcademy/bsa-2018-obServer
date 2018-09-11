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

export interface LogErrorState {
	timestamp: number;
	errors: number;
}

export interface FiltersState {
	activeApp: string;
	timeRanges: {
		logs: string;
		errStats: string;
		CPU: string;
		memory: string;
		usedMemory: string;
		routes: string;
		requests: string;
		httpTabel: string;
	};
	logLevels: {
		error: boolean;
		warn: boolean;
		info: boolean;
		verbose: boolean;
		debug: boolean;
		silly: boolean;
	};
}

export interface NotificationState {
	logType: string;
	timestamp: string;
	message: string;
	companyId: string;
	appId: string;
}
