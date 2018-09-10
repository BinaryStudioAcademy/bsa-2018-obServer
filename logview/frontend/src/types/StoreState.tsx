import {
	CpuLogState,
	MemoryLogState,
	HttpStatsState,
	LogMessagesState,
	NotificationState,
	LogLevelsState
} from './LogsState';
import { UserState } from './UserState';
import { SettingsState } from './SettingsState';
import { AppsState } from './AppsState';
import { ServerState } from './ServerState';
import { CompanyState, UserChangeCompanyState } from './CompanyState';

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
	httpStats: Array<Array<HttpStatsState>>;
	logMessages: Array<LogMessagesState>;
	activeApp: string;
	timeRange: string;
	logLevels: LogLevelsState;
	notificationLogs: Array<NotificationState>;
	fetchingLogsStatus: string;
	sockets: any;
	userChangeCompany: UserChangeCompanyState;
}
