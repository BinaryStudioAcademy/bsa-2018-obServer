import { all, fork } from 'redux-saga/effects';
import userSaga from './user/sagas';
import logsSaga from './log/sagas';

export default function* sagas() {
	yield all([fork(userSaga), fork(logsSaga)]);
}
