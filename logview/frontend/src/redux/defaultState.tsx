import { StoreState } from '../types/StoreState';

export const defaultState: StoreState = {
	user: {
		name: '',
		email: '',
		password: '',
		company: ''
	},

	fetching: 'unstarted'
};
