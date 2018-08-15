import openSocket from 'socket.io-client';

const port = 3060;
const socket = openSocket(`http://localhost:${port}`);

export async function fetchLogs() {
	socket.emit('giveLogs');
	const promise = new Promise(resolve => {
		socket.on('logs', data => {
			resolve(data);
		});
	});
	const fetchedData = await promise;
	return fetchedData;
}
