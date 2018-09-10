import 'regenerator-runtime/runtime';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { userAPI } from '../../services';
import {
	UserRegister,
	UserLogin,
	UserLogout,
	UserChangePassword,
	UserResetPassword,
	UserEmailActivation,
	UserInvite,
	UserSetPassword,
	ChangeUser,
	FetchUser
} from './actions';
import { push } from 'connected-react-router';
import * as constants from './constants';
import { FETCH_COMPANY_USERS } from '../company/constants';

function* userRegister(action: UserRegister) {
	try {
		const currentUser = yield call(userAPI.registerUser, {
			name: action.name,
			email: action.email,
			password: action.password,
			company: action.company
		});

		sessionStorage.setItem(
			'observerUser',
			JSON.stringify(currentUser.data)
		);

		yield put({
			type: constants.USER_REGISTER_SUCCESS,
			payload: {
				...currentUser.data
			}
		});

		yield put(push('/confirmationsent'));
	} catch (error) {
		yield put({
			type: constants.USER_REGISTER_FAILED
		});
	}
}

function* userLogin(action: UserLogin) {
	try {
		const currentUser = yield call(userAPI.loginUser, {
			email: action.email,
			password: action.password
		});

		sessionStorage.setItem(
			'observerUser',
			JSON.stringify(currentUser.data)
		);

		yield put({
			type: constants.USER_LOGIN_SUCCESS,
			payload: {
				// ...currentUser
			}
		});

		// window.location.href = window.location.href;
	} catch (error) {
		yield put({
			type: constants.USER_LOGIN_FAILED
		});
	}
}

function* userLogout(action: UserLogout) {
	try {
		yield call(userAPI.logoutUser);

		sessionStorage.removeItem('observerUser');

		yield put({
			type: constants.USER_LOGOUT_SUCCESS,
			payload: {
				// user: null
			}
		});

		// window.location.href = window.location.href;
		// yield put(push('/login'));
	} catch (error) {
		yield put({
			type: constants.USER_LOGOUT_FAILED
		});
	}
}

function* userResetPassword(action: UserResetPassword) {
	try {
		const currentUser = yield call(userAPI.resetPasswordEmail, {
			email: action.email
		});

		yield put({
			type: constants.USER_RESET_PASSWORD_SUCCESS,
			payload: {
				...currentUser
			}
		});
	} catch (error) {
		yield put({
			type: constants.USER_RESET_PASSWORD_FAILED
		});
	}
}

function* userChangePassword(action: UserChangePassword) {
	try {
		const currentUser = yield call(
			userAPI.changePassword,
			action.resetToken,
			{
				newPassword: action.newPassword
			}
		);
		yield put({
			type: constants.USER_CHANGE_PASSWORD_SUCCESS,
			payload: {
				...currentUser
			}
		});
	} catch (error) {
		yield put({
			type: constants.USER_CHANGE_PASSWORD_FAILED
		});
	}
}

function* userEmailActivation(action: UserEmailActivation) {
	try {
		const currentUser = yield call(userAPI.activateUser, {
			activationToken: action.activationToken
		});

		sessionStorage.setItem(
			'observerUser',
			JSON.stringify(currentUser.data)
		);

		yield put({
			type: constants.USER_EMAIL_ACTIVATION_SUCCESS
		});
	} catch (error) {
		yield put({
			type: constants.USER_EMAIL_ACTIVATION_FAILED
		});
	}
}

function* userInvite(action: UserInvite) {
	try {
		const res = yield call(userAPI.inviteUser, {
			email: action.email,
			name: action.name,
			admin: action.admin
		});
		console.log(res);

		yield put({
			type: constants.USER_INVITE_SUCCESS
		});

		yield put({
			type: FETCH_COMPANY_USERS
		});
	} catch (error) {
		yield put({
			type: constants.USER_INVITE_FAILED
		});
	}
}

function* userSetPassword(action: UserSetPassword) {
	try {
		yield call(userAPI.userSetPassword, action.resetToken, {
			newPassword: action.newPassword
		});

		yield put({
			type: constants.USER_INVITE_SUCCESS
		});

		yield put(push('/login'));
	} catch (error) {
		yield put({
			type: constants.USER_INVITE_FAILED
		});
	}
}

function* userChange(action: ChangeUser) {
	try {
		const currentUser = yield call(userAPI.updateLoggedInUser, {
			name: action.name,
			email: action.email,
			company: action.company,
			companyId: action.companyId
		});

		yield put({
			type: constants.CHANGE_USER_SUCCESS,
			payload: {
				...currentUser.data
			}
		});
	} catch (error) {
		yield put({
			type: constants.CHANGE_USER_FAILED
		});
	}
}

function* fetchUser(action: FetchUser) {
	try {
		const currentUser = yield call(userAPI.fetchLoggedInUser);
		yield put({
			type: constants.FETCH_USER_SUCCESS,
			payload: {
				...currentUser.data
			}
		});
	} catch (error) {
		yield put({
			type: constants.FETCH_USER_FAILED
		});
	}
}

export default function* userSaga() {
	yield all([
		takeLatest(constants.USER_REGISTER, userRegister),
		takeLatest(constants.USER_LOGIN, userLogin),
		takeLatest(constants.USER_LOGOUT, userLogout),
		takeLatest(constants.USER_CHANGE_PASSWORD, userChangePassword),
		takeLatest(constants.USER_RESET_PASSWORD, userResetPassword),
		takeLatest(constants.USER_EMAIL_ACTIVATION, userEmailActivation),
		takeLatest(constants.USER_INVITE, userInvite),
		takeLatest(constants.USER_SET_PASSWORD, userSetPassword),
		takeLatest(constants.CHANGE_USER, userChange),
		takeLatest(constants.FETCH_USER, fetchUser)
	]);
}
