import { UserState } from './UserState';
import { SettingsState } from './SettingsState';

export interface StoreState {
	user: UserState;
	fetchingUserStatus: string;
	settings: SettingsState;
	fetchingSettingsStatus: string;
	isLoggedIn: boolean;
}
