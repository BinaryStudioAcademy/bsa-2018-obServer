import { StoreState } from 'src/types/StoreState';

export const defaultState: StoreState = {
	user: {
		name: '',
		email: '',
		company: '',
		companyId: ''
	},
	settings: {
		serverMemory: undefined,
		serverCPU: undefined,
		notificationServerIsDown: undefined,
		notificationHighRequest: undefined,
		appsMemory: undefined,
		appsCPU: undefined,
		appsErrorLog: undefined,
		appsHttp: undefined,
		appsSoket: undefined,
		listeningPorts: undefined
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

	companyUsers: [
		{
			name: '',
			email: '',
			active: false
		}
	],

	fetchingUserStatus: 'unstarted',
	fetchingSettingsStatus: 'unstarted',
	isLoggedIn: false
};
