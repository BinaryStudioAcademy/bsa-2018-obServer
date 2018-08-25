import { all, fork } from 'redux-saga/effects';
import userSaga from './user/sagas';
import logsSaga from 'src/redux/logs/sagas';
import settingsSaga from './settings/sagas';

export default function* sagas() {
	yield all([fork(userSaga), fork(logsSaga), fork(settingsSaga)]);
}
