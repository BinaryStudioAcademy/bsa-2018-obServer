import io from 'socket.io-client';

const port = 3060;
const socket = io.connect(`http://localhost:${port}`);

export async function getLogs(companyId: string) {
	socket.emit('getLogs', companyId, logs => {
		console.log(JSON.stringify(logs));
	});
}

export async function getNewLog() {
	socket.on('newLog', log => {
		console.log(log);
	});
}

// const socket = io.connect(`http://localhost:${port}`);

// socket.emit('getLogs', companyId, (logs) => {
//   console.log(JSON.stringify(logs));
// });

// socket.on('newLog', (log) => {
//   console.log(log);
// });
