import { StoreState } from 'src/types/StoreState';

export const defaultState: StoreState = {
	user: {
		name: '',
		email: '',
		password: '',
		company: ''
	},

	cpuLogs: [
		{
			logType: '',
			data: {
				cores: [
					{
						coreLoadPercentages: 0,
						coreName: 'core0'
					}
				]
			},
			timestamp: '',
			companyToken: ''
		}
	],

	memoryLogs: [
		{
			logType: '',
			data: {
				allMemory: 0,
				freeMemory: 0,
				freeMemoryPercentage: 0
			},
			timestamp: '',
			companyToken: ''
		}
	],

	fetchingUserStatus: 'unstarted',
	isLoggedIn: false
};
