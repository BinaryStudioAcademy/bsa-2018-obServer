export interface LogState {
	logType: string;
	data: { message: string; status: string };
	timestamp: number;
	serverId: number;
}
