import { all, fork } from 'redux-saga/effects';
import userSaga from './user/sagas';

export default function* sagas() {
	yield all([fork(userSaga)]);
}
