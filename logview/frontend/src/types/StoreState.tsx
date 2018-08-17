import { UserState, UserLoginState } from './UserState';
import { LogState } from './LogState';

export interface StoreState {
	user: UserState;
	logs: [LogState];
	fetchingUserStatus: string;
}
