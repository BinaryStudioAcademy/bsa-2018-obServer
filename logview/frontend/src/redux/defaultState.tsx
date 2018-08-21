import { StoreState } from 'src/types/StoreState';
import { LogState } from '../types/LogState';

export const defaultState: StoreState = {
	user: {
		name: '',
		email: '',
		password: '',
		company: ''
	},

	log: {
		logType: '',
		data: { message: '', status: '' },
		timestamp: -1,
		serverId: -1
	},

	logs: [
		{
			logType: '',
			data: { message: '', status: '' },
			timestamp: -1,
			serverId: -1
		}
	],

	fetchingUserStatus: 'unstarted',

	fetchingLogStatus: 'unstarted',
	isLoggedIn: false
};
