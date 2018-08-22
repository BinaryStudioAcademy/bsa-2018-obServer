import { all, fork } from 'redux-saga/effects';
import userSaga from './user/sagas';
import companySaga from './company/sagas';

export default function* sagas() {
	yield all([fork(userSaga), fork(companySaga)]);
}
