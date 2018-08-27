import { CpuLogState, MemoryLogState } from './LogsState';
import { UserState } from './UserState';
import { SettingsState } from './SettingsState';
import { CompanyState } from './CompanyState';

export interface StoreState {
	user: UserState;
	companyUsers: Array<CompanyState>;
	fetchingUserStatus: string;
	settings: SettingsState;
	cpuLogs: Array<CpuLogState>;
	memoryLogs: Array<MemoryLogState>;
	fetchingSettingsStatus: string;
	isLoggedIn: boolean;
}
