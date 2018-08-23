export interface CpuLogState {
	logType: string;
	data: {
		cores: [
			{
				coreLoadPercentages: number;
				coreName: string;
			}
		];
	};
	timestamp: string;
	serverId: number;
}

export interface MemoryLogState {
	companyToken: string;
	data: {
		allMemory: number;
		freeMemory: number;
		freeMemoryPercentage: number;
	};
	logType: string;
	timestamp: string;
}
