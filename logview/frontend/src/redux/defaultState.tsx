import { StoreState } from 'src/types/StoreState';

export const defaultState: StoreState = {
	user: {
		name: '',
		email: '',
		password: '',
		company: ''
	},

	// company: [

	// ],

	fetchingUserStatus: 'unstarted'
};
