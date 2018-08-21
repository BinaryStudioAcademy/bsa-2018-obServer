import { UserState, UserLoginState } from './UserState';
import { LogsState } from './LogsState';
import { LogState } from './LogState';

export interface StoreState {
	user: UserState;
	logs: LogsState;
	log: LogState;
	fetchingUserStatus: string;
	fetchingLogStatus: string;
	isLoggedIn: boolean;
}
