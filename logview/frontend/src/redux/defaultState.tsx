import { StoreState } from 'src/types/StoreState';

export const defaultState: StoreState = {
	user: {
		name: '',
		email: '',
		password: '',
		company: ''
	},

	companyUsers: [
		{
			name: '',
			email: '',
			active: false
		}
	],

	fetchingUserStatus: 'unstarted',
	isLoggedIn: false
};
