import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { apply } from 'redux-saga/effects';

const port = 3060;
const url = `http://localhost:${port}`;

let socket;

export const connect = () => {
	socket = io(url);
	return new Promise(resolve => {
		socket.on('connect', () => {
			console.log('CONNECTED');
			resolve(socket);
		});
	});
};

export const createSocketChannel = socket =>
	eventChannel(emit => {
		const handler = data => {
			emit(data);
		};
		socket.on('newLog', handler);
		const unsubscribe = () => socket.off('newLog', handler);
		return unsubscribe;
	});

export function* fetchAllLogs(companyId) {
	yield apply(socket, socket.emit('getLogs'), companyId);
}
