import {
	CpuLogState,
	MemoryLogState,
	HttpStatsState,
	LogMessagesState,
	NotificationState
} from './LogsState';
import { UserState } from './UserState';
import { SettingsState } from './SettingsState';
import { CompanyState } from './CompanyState';
import { AppsState } from './AppsState';
import { ServerState } from './ServerState';

export interface StoreState {
	user: UserState;
	companyUsers: Array<CompanyState>;
	isLoggedIn: boolean;
	fetchingUserStatus: string;
	fetchingSettingsStatus: string;
	settings: SettingsState;
	apps: Array<AppsState>;
	server: ServerState;
	fetchingServerStatus: string;
	fetchingAppsStatus: string;
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
	notificationLogs: Array<NotificationState>;
	fetchingLogsStatus: string;
	sockets: any;
}
