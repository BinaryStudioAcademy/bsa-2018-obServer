import * as userActions from './user/actions';
import * as settingsActions from './settings/actions';
import * as companyActions from './company/actions';

export type Action =
	| userActions.UserAction
	| companyActions.CompanyAction
	| settingsActions.SettingsAction
	| any;
