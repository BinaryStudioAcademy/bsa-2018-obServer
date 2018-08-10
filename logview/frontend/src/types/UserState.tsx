export interface UserState {
	name: string;
	email: string;
	password: string;
	company: string;
}

export interface UserLoginState {
	email: string;
	password: string;
}

export interface FetchingState {
	fetching: string;
}
