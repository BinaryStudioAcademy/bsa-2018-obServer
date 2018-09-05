import { CpuLogState, MemoryLogState, HttpStatsState } from './LogsState';
import { UserState } from './UserState';
import { SettingsState } from './SettingsState';
import { CompanyState } from './CompanyState';
import { AppsState } from './AppsState';

export interface StoreState {
	user: UserState;
	companyUsers: Array<CompanyState>;
	isLoggedIn: boolean;
	fetchingUserStatus: string;
	fetchingSettingsStatus: string;
	settings: SettingsState;
	apps: Array<AppsState>;
	fetchingAppsStatus: string;
	cpuLogs: Array<CpuLogState>;
	memoryLogs: Array<MemoryLogState>;
	httpStats: Array<HttpStatsState>;
	fetchingLogsStatus: string;
	sockets: any;
}
