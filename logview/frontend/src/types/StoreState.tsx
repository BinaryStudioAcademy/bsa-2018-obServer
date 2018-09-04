import { CpuLogState, MemoryLogState, HttpStatsState } from './LogsState';
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
	httpStats: Array<Array<HttpStatsState>>;
	fetchingLogsStatus: string;
}
