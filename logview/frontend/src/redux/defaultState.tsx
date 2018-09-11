import { StoreState } from '../types/StoreState';

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
		appsSoket: undefined
	},
	server: {
		logcollectAddress: '',
		logcollectPort: '',
		companyId: ''
	},
	apps: [
		{
			name: undefined,
			port: undefined,
			id: undefined
		}
	],
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
			companyToken: '',
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
			companyToken: '',
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
	logMessages: [
		{
			appId: '',
			timestamp: '',
			logLevel: 0,
			message: ''
		}
	],
	filters: {
		activeApp: '',
		timeRange: 'last 10 minutes',
		logLevels: {
			error: true,
			warn: true,
			info: true,
			verbose: false,
			debug: false,
			silly: false
		}
	},
	fetchingUserStatus: 'unstarted',
	fetchingSettingsStatus: 'unstarted',
	fetchingAppsStatus: 'unstarted',
	fetchingServerStatus: 'unstarted',
	fetchingLogsStatus: 'unstarted',
	isLoggedIn: false,
	sockets: undefined,
	userChangeCompany: {
		companyName: ''
	}
};
