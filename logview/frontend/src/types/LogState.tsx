export interface LogState {
	logs: [
		{
			logType: string;
			data: object;
			timestamp: Date;
			serverId: string;
		}
	];
}
