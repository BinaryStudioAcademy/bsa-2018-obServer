import { StoreState } from '../types/StoreState';

export const defaultState: StoreState = {
	user: {
		id: '',
		companyId: '',
		name: '',
		email: '',
		password: '',
		resetPasswordtoken: '',
		resetPasswordExpires: new Date()
	}
};
