import {
	takeLatest,
	put,
	call,
	all,
	take,
	race,
	apply,
	fork
} from 'redux-saga/effects';
import * as constants from './constants';
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { connect, createSocketChannel } from 'src/services/websockets/logs';

function* fetchLog() {
	try {
		const companyId = 'LOG_COLLECT_SECRET_TOKEN';
		const socket = yield call(connect);

		socket.emit('getLogs', companyId, logs => {
			console.log(logs);
		});

		const socketChannel = yield call(createSocketChannel, socket);
		while (true) {
			const newLog = yield take(socketChannel);
			console.log(newLog);
			// yield put({
			// 	type: constants.ADD_NEW_LOG,
			// 	log: newLog
			// });
		}
	} catch (err) {
		yield put({
			type: constants.FETCH_LOG_FAILED
		});
	}
}

export default function* logSaga() {
	while (true) {
		yield race({
			task: call(fetchLog)
		});
	}
}
