import { UserState } from './UserState';

export interface StoreState {
	user: UserState;
	fetchingUserStatus: string;
	isLoggedIn: boolean;
}
