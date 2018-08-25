import { CpuLogState, MemoryLogState } from './LogsState';
import { UserState } from './UserState';
import { SettingsState } from './SettingsState';

export interface StoreState {
	user: UserState;
	cpuLogs: Array<CpuLogState>;
	memoryLogs: Array<MemoryLogState>;
	fetchingUserStatus: string;
	settings: SettingsState;
	fetchingSettingsStatus: string;
	isLoggedIn: boolean;
}
