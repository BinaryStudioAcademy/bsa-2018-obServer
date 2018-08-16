import 'regenerator-runtime/runtime';
import { takeLatest, put, call, all, take } from 'redux-saga/effects';
import { userAPI } from '../../services';
import {
	UserRegister,
	UserLogin,
	UserChangePassword,
	UserResetPassword,
	UserEmailActivation
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
		sessionStorage.setItem('user', action.email);

		const currentUser = yield call(userAPI.loginUser, {
			email: action.email,
			password: action.password
		});

		yield put({
			type: constants.USER_LOGIN_SUCCESS,
			payload: {
				// ...currentUser
			}
		});

		yield put(push('/'));
	} catch (error) {
		yield put({
			type: constants.USER_LOGIN_FAILED
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

		yield put(push('/'));
	} catch (error) {
		yield put({
			type: constants.USER_CHANGE_PASSWORD_FAILED
		});
	}
}

function* userEmailActivation(action: UserEmailActivation) {
	try {
		yield call(userAPI.activateUser, action.token);

		yield put({
			type: constants.USER_EMAIL_ACTIVATION_SUCCESS
		});
	} catch (error) {
		yield put({
			type: constants.USER_EMAIL_ACTIVATION_FAILED
		});
	}
}

export default function* userSaga() {
	yield all([
		takeLatest(constants.USER_REGISTER, userRegister),
		takeLatest(constants.USER_LOGIN, userLogin),
		takeLatest(constants.USER_CHANGE_PASSWORD, userChangePassword),
		takeLatest(constants.USER_RESET_PASSWORD, userResetPassword),
		takeLatest(constants.USER_EMAIL_ACTIVATION, userEmailActivation)
	]);
}
