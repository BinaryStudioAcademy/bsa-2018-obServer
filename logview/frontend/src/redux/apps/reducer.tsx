import * as constants from './constants';
import { AppsListAction } from './actions';
import { AppsState } from '../../types/AppsState';
import { defaultState } from '../defaultState';
import { appendFile } from 'fs';

export function appsReducer(
	state: Array<AppsState> = defaultState.apps,
	action: AppsListAction
): Array<AppsState> {
	switch (action.type) {
		case constants.FETCH_APPS_LIST_SUCCESS: {
			return [...action.payload];
		}
		case constants.ADD_NEW_APP_SUCCESS: {
			return [...state, action.payload];
		}
		case constants.UPDATE_APP_SUCCESS: {
			return state.map(app => {
				if (app.id === action.payload.id) {
					return action.payload;
				}
				return app;
			});
		}
		case constants.DELETE_APP_SUCCESS:
			return state.filter(app => app.id !== action.payload);
		default:
			return state;
	}
}

export function fetchingAppsReducer(
	state = 'unstarted',
	action: AppsListAction
) {
	switch (action.type) {
		case constants.FETCH_APPS_LIST_SUCCESS:
		case constants.ADD_NEW_APP_SUCCESS:
		case constants.DELETE_APP_SUCCESS:
		case constants.UPDATE_APP_SUCCESS:
			return 'success';
		case constants.FETCH_APPS_LIST_FAILED:
		case constants.ADD_NEW_APP_FAILED:
		case constants.DELETE_APP_FAILED:
		case constants.UPDATE_APP_FAILED:
			return 'failed';
		case constants.FETCH_APPS_LIST:
		case constants.ADD_NEW_APP:
		case constants.DELETE_APP:
		case constants.UPDATE_APP:
			return 'pending';
		default:
			return state;
	}
}
