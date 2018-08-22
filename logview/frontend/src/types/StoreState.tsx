import { UserState } from './UserState';
import { CompanyState } from './CompanyState';

export interface StoreState {
	user: UserState;
	companyUsers: Array<CompanyState>;
	fetchingUserStatus: string;
	isLoggedIn: boolean;
}
