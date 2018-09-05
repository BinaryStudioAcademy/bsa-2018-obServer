export interface CompanyState {
	name: string;
	email: string;
	active: boolean;
}

export interface UserChangeCompany {
	companyName: string;
}