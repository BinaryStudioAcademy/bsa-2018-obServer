const ioClient = require('socket.io-client');

module.exports = (io, port) => {
	const aggrStoreSocket = ioClient.connect('http://localhost:3001');

	io.set('origins', `http://localhost:${port}`);
	io.origins('*:*');

	io.on('connection', socket => {
		console.log(`Connected new socket ${socket.id}`);

		socket.on('getLogs', (companyId, response) => {
			aggrStoreSocket.emit('getLogs', companyId, logs => {
				console.log(logs);
				response(logs);
			});
			socket.join(companyId);
		});
	});

	aggrStoreSocket.on('newLog', log => {
		io.to(log.companyToken).emit('newLog', log);
	});
};
