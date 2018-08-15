import io from 'socket.io-client';

const port = 3060;
const socket = io(`http://localhost:${port}`);

export async function fetchLogs() {
	const fetchedData = [];
	await socket.on('logs', data => [...fetchedData, data]);
	return fetchedData;
}
