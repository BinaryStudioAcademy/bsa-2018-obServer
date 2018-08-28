const ioClient = require('socket.io-client');
const settingService = require('../services/settingService');
const eventEmitter = require('../events');
const port = process.env.APP_PORT;
const aggrStoreURL = `http://localhost:3001`;
const logviewURL = `http://localhost:${port}`;


module.exports = io => {
	const aggrStoreSocket = ioClient.connect(aggrStoreURL);

	io.set('origins', logviewURL);
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