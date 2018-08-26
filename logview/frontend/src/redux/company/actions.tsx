import * as constants from './constants';
import { CompanyState } from '../../types/CompanyState';

export interface FetchCompanyUsers {
	type: constants.FETCH_COMPANY_USERS;
}

export interface FetchCompanyUsersFail {
	type: constants.FETCH_COMPANY_USERS_FAILED;
}

export interface FetchCompanyUsersSuccess {
	type: constants.FETCH_COMPANY_USERS_SUCCESS;
	payload: {
		users: Array<CompanyState>;
	};
}

export type CompanyAction =
	| FetchCompanyUsers
	| FetchCompanyUsersFail
	| FetchCompanyUsersSuccess;

export function fetchCompanyUsers(): FetchCompanyUsers {
	return {
		type: constants.FETCH_COMPANY_USERS
	};
}

export function fetchCompanyUsersFail(): FetchCompanyUsersFail {
	return {
		type: constants.FETCH_COMPANY_USERS_FAILED
	};
}

export function fetchCompanyUsersSuccess(payload: {
	users: Array<CompanyState>;
}): FetchCompanyUsersSuccess {
	return {
		type: constants.FETCH_COMPANY_USERS_SUCCESS,
		payload
	};
}
