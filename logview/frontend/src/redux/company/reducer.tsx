import * as constants from './constants';
import { CompanyAction } from './actions';
import { CompanyState } from 'src/types/CompanyState';
import { defaultState } from '../defaultState';

export function companyReducer(
	state: Array<CompanyState> = defaultState.companyUsers,
	action: CompanyAction
): Array<CompanyState> {
	switch (action.type) {
		case constants.FETCH_COMPANY_USERS:
			console.log(action);
			return {
				...state
				// name: action.companyUsers.name,
				// email: action.email,
				// activation: action.activation
			};
		default:
			return state;
	}
}
