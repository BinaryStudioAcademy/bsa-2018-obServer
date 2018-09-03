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
	companyId: string;
	totalLoadPercentages: number;
}

export interface MemoryLogState {
	companyId: string;
	data: {
		allMemory: number;
		freeMemory: number;
		freeMemoryPercentage: number;
	};
	logType: string;
	timestamp: string;
}
