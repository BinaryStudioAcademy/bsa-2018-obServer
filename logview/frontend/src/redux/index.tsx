import * as userActions from './user/actions';
import * as companyActions from './company/actions';

export type Action =
	| userActions.UserAction
	| companyActions.CompanyAction
	| any;
