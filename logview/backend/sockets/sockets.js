const ioClient = require('socket.io-client');
const combineSettingService = require('../services/combineSettingService');
const appService = require('../services/appService');
const eventEmitter = require('../events');
const port = process.env.APP_PORT;
const aggregatedStoragePort = process.env.AGGREGATEDSTORAGE_PORT;
const aggregatedStorageHost = process.env.AGGREGATEDSTORAGE_HOST || 'localhost';
const aggrStoreURL = `http://${aggregatedStorageHost}:${aggregatedStoragePort}`;
const logviewURL = `http://localhost:${port}`;

module.exports = io => {
	const aggrStoreSocket = ioClient.connect(aggrStoreURL);

	io.set('origins', logviewURL);
	io.origins('*:*');

	io.on('connection', socket => {
		socket.on('getLogs', companyId => {
			socket.join(companyId);
		});

		socket.on('logcollect get settings', async companyId => {
			const settings = await combineSettingService.combineByCompanyId(
				companyId
			);
			socket.emit('logview post settings', settings);
			socket.join(companyId);
		});

		eventEmitter.on('update company settings', async companyId => {
			const settings = await combineSettingService.combineByCompanyId(
				companyId
			);
			io.to(socket.id).emit('logview post settings', settings);
		});
	});

	aggrStoreSocket.on('newLog', log => {
		console.log(log);
		io.to(log.companyId).emit('newLog', log);
	});
};
