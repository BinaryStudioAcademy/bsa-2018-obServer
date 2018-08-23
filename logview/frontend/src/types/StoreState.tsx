import { UserState, UserLoginState } from './UserState';
import { CpuLogState, MemoryLogState } from './LogsState';

export interface StoreState {
	user: UserState;
	cpuLogs: Array<CpuLogState>;
	memoryLogs: Array<MemoryLogState>;
	fetchingUserStatus: string;
	isLoggedIn: boolean;
}
