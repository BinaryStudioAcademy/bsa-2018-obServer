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
	UserSetPassword
} from './actions';
import { push } from 'connected-react-router';
import * as constants from './constants';

function* userRegister(action: UserRegister) {
	try {
		const currentUser = yield call(userAPI.registerUser, {
			name: action.name,
			email: action.email,
			password: action.password,
			company: action.company
		});

		yield put({
			type: constants.USER_REGISTER_SUCCESS,
			payload: {
				...currentUser
			}
		});

		yield put(push('/confirm'));
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

		sessionStorage.setItem('observerUser', action.email);

		yield put({
			type: constants.USER_LOGIN_SUCCESS,
			payload: {
				// ...currentUser
			}
		});

		window.location.href = window.location.href;
	} catch (error) {
		yield put({
			type: constants.USER_LOGIN_FAILED
		});
	}
}

function* userLogout(action: UserLogout) {
	try {
		yield call(userAPI.logoutUser);

		sessionStorage.setItem('observerUser', '');

		yield put({
			type: constants.USER_LOGOUT_SUCCESS,
			payload: {
				// user: null
			}
		});

		window.location.href = window.location.href;
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

		sessionStorage.setItem('observerUser', currentUser.data.email);

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
		yield call(userAPI.inviteUser, {
			email: action.email,
			name: action.name
		});

		yield put({
			type: constants.USER_INVITE_SUCCESS
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

		yield put(push('/dashboard/quickstart'));
	} catch (error) {
		yield put({
			type: constants.USER_INVITE_FAILED
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
		takeLatest(constants.USER_SET_PASSWORD, userSetPassword)
	]);
}
