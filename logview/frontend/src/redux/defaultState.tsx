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
			companyId: '',
			totalLoadPercentages: 0
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
			companyId: ''
		}
	],
	companyUsers: [
		{
			name: '',
			email: '',
			active: false
		}
	],
	httpStats: [
		{
			logType: '',
			timestamp: '',
			data: {
				route: '',
				method: '',
				responseTimeMin: 0,
				responseTimeMax: 0,
				responseTimeAvg: 0,
				bodySizeRequest: 0,
				bodySizeResponse: 0,
				requestsCount: 0
			}
		}
	],
	fetchingUserStatus: 'unstarted',
	fetchingSettingsStatus: 'unstarted',
	fetchingLogsStatus: 'unstarted',
	isLoggedIn: false
};
