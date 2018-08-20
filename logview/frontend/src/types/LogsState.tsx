export interface LogsState {
	logs: Array<{
		logType: string;
		data: { message: string; status: string };
		timestamp: number;
		serverId: number;
	}>;
}
