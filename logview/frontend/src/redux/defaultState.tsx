import { StoreState } from 'src/types/StoreState';

export const defaultState: StoreState = {
	user: {
		name: '',
		email: '',
		password: '',
		company: ''
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
	fetchingUserStatus: 'unstarted',
	fetchingSettingsStatus: 'unstarted',
	isLoggedIn: false
};
