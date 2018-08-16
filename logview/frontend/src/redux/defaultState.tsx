import { StoreState } from 'src/types/StoreState';

export const defaultState: StoreState = {
	user: {
		name: '',
		email: '',
		password: '',
		company: ''
	},

	logs: {
		logType: '',
		data: { message: '' },
		timestamp: -1,
		serverId: -1
	},

	fetching: 'unstarted'
};
