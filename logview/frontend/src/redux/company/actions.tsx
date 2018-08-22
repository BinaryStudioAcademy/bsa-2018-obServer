import * as constants from './constants';
import { CompanyState } from '../../types/CompanyState';

export interface FetchCompanyUsers extends CompanyState {
	type: constants.FETCH_COMPANY_USERS;
}

export interface FetchCompanyUsersFail {
	type: constants.FETCH_COMPANY_USERS_FAILED;
}

export interface FetchCompanyUsersSuccess {
	type: constants.FETCH_COMPANY_USERS_SUCCESS;
}

export type CompanyAction =
	| FetchCompanyUsers
	| FetchCompanyUsersFail
	| FetchCompanyUsersSuccess;

export function FetchCompanyUsers(
	company: string,
	name: string[]
): FetchCompanyUsers {
	return {
		type: constants.FETCH_COMPANY_USERS,
		company,
		name
	};
}

export function FetchCompanyUsersFail(): FetchCompanyUsersFail {
	return {
		type: constants.FETCH_COMPANY_USERS_FAILED
	};
}

export function FetchCompanyUsersSuccess(): FetchCompanyUsersSuccess {
	return {
		type: constants.FETCH_COMPANY_USERS_SUCCESS
	};
}
