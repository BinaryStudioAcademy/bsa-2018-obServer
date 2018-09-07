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
			cores: [
				{
					coreLoadPercentages: 0,
					coreName: 'core0'
				}
			],
			totalLoadPercentage: 0,
			timestamp: '',
			companyId: ''
		},
		{
			logType: '',
			cores: [
				{
					coreLoadPercentages: 0,
					coreName: 'core0'
				}
			],
			totalLoadPercentage: 0,
			timestamp: '',
			companyId: ''
		},
		{
			logType: '',
			cores: [
				{
					coreLoadPercentages: 0,
					coreName: 'core0'
				}
			],
			totalLoadPercentage: 0,
			timestamp: '',
			companyId: ''
		}
	],
	memoryLogs: [
		{
			logType: '',
			allMemory: 0,
			freeMemory: 0,
			freeMemoryPercentage: 0,
			timestamp: '',
			companyId: ''
		},
		{
			logType: '',
			allMemory: 0,
			freeMemory: 0,
			freeMemoryPercentage: 0,
			timestamp: '',
			companyId: ''
		}
	],
	notificationLogs: [
		{
			logType: '',
			timestamp: '',
			message: '',
			companyId: '',
			appId: ''
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
	isLoggedIn: false,
	sockets: undefined,
	userChangeCompany: {
		companyName: ''
	}
};
