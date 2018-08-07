import { StoreState } from '../types/StoreState';

export const defaultState: StoreState = {
	user: {
		tokenAuth: '',
		createdAt: new Date(),
		servers: [],
		login: '',
		email: '',
	}
};