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
import { CompanyState, UserChangeCompanyState } from './CompanyState';

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
	logLevels: LogLevelsState;
	notificationLogs: Array<NotificationState>;
	fetchingLogsStatus: string;
	sockets: any;
	userChangeCompany: UserChangeCompanyState;
}
