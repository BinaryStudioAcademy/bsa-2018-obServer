export interface UserState {
	id: string;
	companyId: string;
	name: string;
	email: string;
	password: string;
	resetPasswordtoken: string;
	resetPasswordExpires: Date;
}
