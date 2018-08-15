import { all, fork } from 'redux-saga/effects';
import userSaga from './user/sagas';
import logSaga from 'src/redux/log/sagas';

export default function* sagas() {
	yield all([fork(userSaga), fork(logSaga)]);
}
