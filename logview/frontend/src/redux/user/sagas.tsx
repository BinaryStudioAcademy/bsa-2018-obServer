import 'regenerator-runtime/runtime';
import { takeLatest, put, call, all, take } from 'redux-saga/effects';
import userApi from '../../services/domains/user';
import { UserState } from '../../types/UserState';
import {
	UserRegister,
	UserLogin,
	UserChangePassword,
	UserResetPassword
} from './actions';
import { push } from 'connected-react-router';
import {
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILED,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILED,
	USER_REGISTER,
	USER_LOGIN,
	USER_CHANGE_PASSWORD,
	USER_RESET_PASSWORD,
	USER_RESET_PASSWORD_FAILED,
	USER_RESET_PASSWORD_SUCCESS,
	USER_CHANGE_PASSWORD_SUCCESS,
	USER_CHANGE_PASSWORD_FAILED
} from './constants';

function* userRegister(action: UserRegister) {
	try {
		console.log(action);

		const currentUser = yield call(userApi.registerUser, {
			name: action.name,
			email: action.email,
			password: action.password,
			company: action.company
		});

		yield put({
			type: USER_REGISTER_SUCCESS,
			payload: {
				...currentUser
			}
		});

		yield put(push('/login'));
	} catch (error) {
		yield put({
			type: USER_REGISTER_FAILED
		});
	}
}

function* userLogin(action: UserLogin) {
	try {
		console.log(action);

		const currentUser = yield call(userApi.loginUser, {
			email: action.email,
			password: action.password
		});
		yield put({
			type: USER_LOGIN_SUCCESS,
			payload: {
				...currentUser
			}
		});

		yield put(push('/'));
	} catch (error) {
		yield put({
			type: USER_LOGIN_FAILED
		});
	}
}

function* userResetPassword(action: UserResetPassword) {
	try {
		const currentUser = yield call(userApi.loginUser, {
			email: action.email
		});

		yield put({
			type: USER_RESET_PASSWORD_SUCCESS,
			payload: {
				...currentUser
			}
		});
	} catch (error) {
		yield put({
			type: USER_RESET_PASSWORD_FAILED
		});
	}
}

function* userChangePassword(action: UserChangePassword) {
	try {
		const currentUser = yield call(userApi.loginUser, {
			email: action.email,
			password: action.password
		});
		yield put({
			type: USER_CHANGE_PASSWORD_SUCCESS,
			payload: {
				...currentUser
			}
		});

		yield put(push('/'));
	} catch (error) {
		yield put({
			type: USER_CHANGE_PASSWORD_FAILED
		});
	}
}

export default function* userSaga() {
	yield all([
		takeLatest(USER_REGISTER, userRegister),
		takeLatest(USER_LOGIN, userLogin),
		takeLatest(USER_CHANGE_PASSWORD, userChangePassword),
		takeLatest(USER_RESET_PASSWORD, userResetPassword)
	]);
}
