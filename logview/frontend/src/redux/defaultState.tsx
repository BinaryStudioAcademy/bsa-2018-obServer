import { StoreState } from 'src/types/StoreState';

export const defaultState: StoreState = {
	user: {
		name: '',
		email: '',
		password: '',
		company: ''
	},

	logs: [
		{
			logType: '',
			data: { message: '', status: '' },
			timestamp: -1,
			serverId: -1
		}
	],

	fetchingUserStatus: 'unstarted'
};
