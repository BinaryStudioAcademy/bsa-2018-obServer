import 'regenerator-runtime/runtime';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import userApi from '../../services/domains/user';
import { UserState } from '../../types/UserState';
import { UserRegister, UserLogin } from './actions';
import {
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILED,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILED,
	USER_REGISTER,
	USER_LOGIN
} from './constants';

function* userRegister(action: UserRegister) {
	try {
		const currentUser = yield call(userApi.registerUser, {
			name: action.name,
			email: action.email,
			password: action.password
		});
		yield put({
			type: USER_REGISTER_SUCCESS,
			...currentUser
		});
	} catch (error) {
		yield put({
			type: USER_REGISTER_FAILED,
			error: error.message
		});
	}
}

function* userLogin(action: UserLogin) {
	try {
		const currentUser = yield call(userApi.loginUser, {
			email: action.email,
			password: action.password
		});
		yield put({
			type: USER_LOGIN_SUCCESS,
			...currentUser
		});
	} catch (error) {
		yield put({
			type: USER_LOGIN_FAILED,
			error: error.message
		});
	}
}

export default function* userSaga() {
	yield all([
		takeLatest(USER_REGISTER, userRegister),
		takeLatest(USER_LOGIN, userLogin)
	]);
}