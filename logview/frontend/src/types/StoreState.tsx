import {
	CpuLogState,
	MemoryLogState,
	HttpStatsState,
	LogMessagesState
} from './LogsState';
import { UserState } from './UserState';
import { SettingsState } from './SettingsState';
import { CompanyState } from './CompanyState';

export interface StoreState {
	user: UserState;
	companyUsers: Array<CompanyState>;
	isLoggedIn: boolean;
	fetchingUserStatus: string;
	settings: SettingsState;
	fetchingSettingsStatus: string;
	cpuLogs: Array<CpuLogState>;
	memoryLogs: Array<MemoryLogState>;
	httpStats: Array<HttpStatsState>;
	logMessages: Array<LogMessagesState>;
	activeApp: string;
	timeRange: string;
	logLevels: {
		error: boolean;
		warn: boolean;
		info: boolean;
		verbose: boolean;
		debug: boolean;
		silly: boolean;
	};
	fetchingLogsStatus: string;
	sockets: any;
}
