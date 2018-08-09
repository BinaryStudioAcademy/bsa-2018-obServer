import { UserState, UserLoginState } from './UserState';

export interface StoreState {
	user: UserState;
	fetching: string;
}
