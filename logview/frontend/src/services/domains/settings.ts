import api from 'src/services/adapter';
import { SettingsState } from '../../types/SettingsState';

export default {
	updateSettings: (updatedData: SettingsState) => {
		return api.makeRequest(
			`/api/user/company/settings`,
			api.requestType.PUT,
			updatedData
		);
	},
	fetchSettings: () => {
		return api.makeRequest(
			`/api/user/company/settings`,
			api.requestType.GET
		);
	}
};
