import openSocket from 'socket.io-client';

const port = process.env.APP_PORT;
const socket = openSocket(`http://localhost:${port}`);

export async function getLogs(companyId: string, callback: Function) {
	socket.emit('getLogs', companyId, logs => {
		callback(logs);
	});
}

export async function getNewLog(callback: Function) {
	socket.on('newLog', log => {
		callback(log);
	});
}
