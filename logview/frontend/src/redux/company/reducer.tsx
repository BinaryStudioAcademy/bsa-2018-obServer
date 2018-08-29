import * as constants from './constants';
import { CompanyAction } from './actions';
import { CompanyState } from 'src/types/CompanyState';
import { defaultState } from '../defaultState';

export function userReducer(
	state: CompanyState,
	action: CompanyAction
): CompanyState {
	switch (action.type) {
		case constants.FETCH_COMPANY_USERS:
			return {
				...state
				// company: action.company,
				// name: action.name,
			};
		default:
			return state;
	}
}