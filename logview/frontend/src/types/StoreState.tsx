import { UserState, UserLoginState } from './UserState';
import { CompanyState } from './CompanyState';

export interface StoreState {
	user: UserState;
	fetchingUserStatus: string;
	// company: CompanyState;
}
