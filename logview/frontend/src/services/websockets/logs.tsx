import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';

const port = 3060;
const url = `http://localhost:${port}`;

const socketIO = io.connect(url);

export function fetchLogs(companyId: string) {
	socketIO.emit('getLogs', companyId, logs => {
		console.log(JSON.stringify(logs));
	});
}

// export function fetchNewLog(cb) {
// 	socket.on('newLog', log => cb(log));
// }

let socket;

const connect = () => {
	socket = io('http://localhost:3060');
	return new Promise(resolve => {
		socket.on('connect', () => {
			resolve(socket);
		});
	});
};

const createSocketChannel = socket =>
	eventChannel(emit => {
		const handler = data => {
			emit(data);
		};
		socket.on();
		socket.on('newLog', handler);
		return () => {
			socket.off('newLog', handler);
		};
	});
