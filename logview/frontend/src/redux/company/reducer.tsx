import * as constants from './constants';
import { CompanyAction } from './actions';
import { CompanyState } from '../../types/CompanyState';
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
