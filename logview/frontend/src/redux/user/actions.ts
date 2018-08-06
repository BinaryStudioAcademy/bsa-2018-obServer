import {
	USER_SET_EMAIL
} from './constants';

export interface UserSetEmail {
	type: USER_SET_EMAIL;
	email: string;
}

export type UserAction = UserSetEmail;

export function userSetEmail(email: string = ""): UserSetEmail {
  return {
    type: USER_SET_EMAIL,
    email
  };
}