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


export interface UserChangeCompany {
	type: constants.USER_CHANGE_COMPANY;
}

export interface UserChangeCompanyFail {
	type: constants.USER_CHANGE_COMPANY_FAILED;
}

export interface UserChangeCompanySuccess {
	type: constants.USER_CHANGE_COMPANY_SUCCESS;
	companyName: string;
}

export interface UserChangeCompany {
}

export type CompanyAction =
	| FetchCompanyUsers
	| FetchCompanyUsersFail
	| FetchCompanyUsersSuccess
	| UserChangeCompany
	| UserChangeCompanyFail
	| UserChangeCompanySuccess;

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

export function userChangeCompany(): UserChangeCompany {
	return {
		type: constants.USER_CHANGE_COMPANY
	};
}

export function userChangeCompanyFail(): UserChangeCompanyFail {
	return {
		type: constants.USER_CHANGE_COMPANY_FAILED
	};
}

export function userChangeCompanySuccess(
	companyName: string
): UserChangeCompanySuccess {
	return {
		type: constants.USER_CHANGE_COMPANY_SUCCESS,
		companyName
	};
}
