export interface SettingsState {
	serverMemory?: boolean;
	serverCPU?: boolean;
	notificationServerIsDown?: boolean;
	notificationHighRequest?: boolean;
	appsMemory?: boolean;
	appsCPU?: boolean;
	appsErrorLog?: boolean;
	appsHttp?: boolean;
	appsSoket?: boolean;
}
