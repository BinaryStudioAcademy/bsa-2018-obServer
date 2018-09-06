import * as constants from './constants';
import { AppsState } from '../../types/AppsState';

/* add new app */
export interface AddNewApp extends AppsState {
	type: constants.ADD_NEW_APP;
}

export interface AddNewAppSuccess {
	type: constants.ADD_NEW_APP_SUCCESS;
	payload: AppsState;
}

export interface AddNewAppFail {
	type: constants.ADD_NEW_APP_FAILED;
}

/* delete app */
export interface DeleteApp {
	type: constants.DELETE_APP;
	id: string;
}

export interface DeleteAppSuccess {
	type: constants.DELETE_APP_SUCCESS;
	payload: string;
}

export interface DeleteAppFail {
	type: constants.DELETE_APP_FAILED;
}

/* update app */
export interface UpdateApp extends AppsState {
	type: constants.UPDATE_APP;
}

export interface UpdateAppSuccess {
	type: constants.UPDATE_APP_SUCCESS;
	payload: AppsState;
}

export interface UpdateAppFail {
	type: constants.UPDATE_APP_FAILED;
}

/* fetch apps list */
export interface FetchAppsList {
	type: constants.FETCH_APPS_LIST;
}

export interface FetchAppsListSuccess {
	type: constants.FETCH_APPS_LIST_SUCCESS;
	payload: Array<AppsState>;
}

export interface FetchAppsListFail {
	type: constants.FETCH_APPS_LIST_FAILED;
}

export type AppsListAction =
	| DeleteApp
	| DeleteAppFail
	| DeleteAppSuccess
	| UpdateApp
	| UpdateAppFail
	| UpdateAppSuccess
	| AddNewApp
	| AddNewAppFail
	| AddNewAppSuccess
	| FetchAppsList
	| FetchAppsListFail
	| FetchAppsListSuccess;

export function addNewApp(name: string, id?: string): AddNewApp {
	return {
		type: constants.ADD_NEW_APP,
		name,
		id
	};
}

export function deleteApp(id: string): DeleteApp {
	return {
		type: constants.DELETE_APP,
		id
	};
}

export function updateApp(id: string, name: string): UpdateApp {
	return {
		type: constants.UPDATE_APP,
		id,
		name
	};
}

export function fetchAppsList(): FetchAppsList {
	return {
		type: constants.FETCH_APPS_LIST
	};
}
