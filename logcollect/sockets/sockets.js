const ioClient = require('socket.io-client');
const eventEmitter = require('../events');
const secretToken = process.env.COMPANY_TOKEN;
const port = process.env.LOGCOLLECT_PORT;
const logviewURL = `http://localhost:3060`;
const logcollectURL = `http://localhost:${port}`;

module.exports = io => {
  const logviewSocket = ioClient.connect(logviewURL);

  io.set('origins', logcollectURL);
  io.origins('*:*');

  logviewSocket.emit('logcollect get settings', secretToken);

  logviewSocket.on('logview post settings', settings => {
    eventEmitter.emit('get new settings', settings);
  });
};
