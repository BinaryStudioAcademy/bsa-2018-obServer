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
	| AddNewApp
	| AddNewAppFail
	| AddNewAppSuccess
	| FetchAppsList
	| FetchAppsListFail
	| FetchAppsListSuccess;

export function addNewApp(appName: string, appId?: string): AddNewApp {
	return {
		type: constants.ADD_NEW_APP,
		appName,
		appId
	};
}

export function fetchAppsList(): FetchAppsList {
	return {
		type: constants.FETCH_APPS_LIST
	};
}
