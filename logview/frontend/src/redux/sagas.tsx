import { all, fork } from 'redux-saga/effects';
import userSaga from './user/sagas';
import logsSaga from './logs/sagas';
import settingsSaga from './settings/sagas';
import companySaga from './company/sagas';

export default function* sagas() {
	yield all([
		fork(userSaga),
		fork(logsSaga),
		fork(settingsSaga),
		fork(companySaga)
	]);
}
