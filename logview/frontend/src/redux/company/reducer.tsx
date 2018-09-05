import * as constants from './constants';
import { CompanyAction } from './actions';
import { CompanyState, UserChangeCompanyState } from 'src/types/CompanyState';
import { defaultState } from '../defaultState';

export function companyReducer(
	state: Array<CompanyState> = defaultState.companyUsers,
	action: CompanyAction
): Array<CompanyState> {
	switch (action.type) {
		case constants.FETCH_COMPANY_USERS:
			return {
				...state
			};
		case constants.FETCH_COMPANY_USERS_SUCCESS:
			return [...state, ...action.payload.users];
		default:
			return state;
	}
}

export function companyChangeReducer(
	state: UserChangeCompanyState = defaultState.userChangeCompany,
	action: CompanyAction
) {
	switch (action.type) {
		case constants.USER_CHANGE_COMPANY:
			console.log(action);
			return {
				...state
			};
		case constants.USER_CHANGE_COMPANY_SUCCESS:
			console.log(action);
			return  {
				...state
			};
		default:
			return state;
	}
}