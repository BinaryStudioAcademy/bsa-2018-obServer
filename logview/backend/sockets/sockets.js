const ioClient = require('socket.io-client');
const settingService = require('../services/settingService');
const eventEmitter =  require('../events');


module.exports = (io, port) => {
	const aggrStoreSocket = ioClient.connect('http://localhost:3001');

	io.set('origins', `http://localhost:${port}`);
	io.origins('*:*');

	io.on('connection', socket => {
		console.log(`Connected new socket ${socket.id}`);

		socket.on('getLogs', (companyId, response) => {
			aggrStoreSocket.emit('getLogs', companyId, logs => {
				response(logs);
			});
			socket.join(companyId);
		});

		socket.on('logcollect get settings', async (companyId) => {
			const settings = await settingService.findByCompanyId(companyId);
			socket.emit('logview post settings', settings);
			socket.join(companyId);	
		});

		eventEmitter.on('update company settings', settings => {
			io.to(socket.id).emit('logview post settings', settings);
		});

	});

	aggrStoreSocket.on('newLog', log => {
		io.to(log.companyToken).emit('newLog', log);
	});
};