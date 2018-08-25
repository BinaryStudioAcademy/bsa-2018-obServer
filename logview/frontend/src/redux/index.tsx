import * as userActions from './user/actions';
import * as settingsActions from './settings/actions';

export type Action =
	| userActions.UserAction
	| settingsActions.SettingsAction
	| any;
