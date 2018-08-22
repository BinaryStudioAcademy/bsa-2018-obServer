import { UserState } from './UserState';
import { SettingsState } from './SettingsState';

export interface StoreState {
	user: UserState;
	settings: SettingsState;
	fetchingUserStatus: string;
	isLoggedIn: boolean;
}
