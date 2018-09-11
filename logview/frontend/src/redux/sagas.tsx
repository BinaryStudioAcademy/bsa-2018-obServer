import { all, fork } from 'redux-saga/effects';
import userSaga from './user/sagas';
import logsSaga from './logs/sagas';
import settingsSaga from './settings/sagas';
import appsSaga from './apps/sagas';
import serverSaga from './server/sagas';
import companySaga from './company/sagas';
import socketsSaga from './sockets/sagas';

export default function* sagas() {
	yield all([
		fork(userSaga),
		fork(logsSaga),
		fork(settingsSaga),
		fork(appsSaga),
		fork(serverSaga),
		fork(companySaga),
		fork(socketsSaga)
	]);
}
