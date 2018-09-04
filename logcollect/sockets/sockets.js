const ioClient = require('socket.io-client');
const eventEmitter = require('../events');
const sendRequset = require('../apiRequest');
const secretToken = process.env.LOGCOLLECT_SECRET_TOKEN;
const port = process.env.LOGCOLLECT_PORT;
const rawStorePort = process.env.RAWSTORAGE_PORT;
const logviewURL = `http://localhost:3060`;
const logcollectURL = `http://localhost:${port}`;
const rawStorePingUrl = `http://localhost:${rawStorePort}/api/ping`;

module.exports = io => {
  const logviewSocket = ioClient.connect(logviewURL);

  io.set('origins', logcollectURL);
  io.origins('*:*');

  logviewSocket.emit('logcollect get settings', secretToken);

  logviewSocket.on('logview post settings', settings => {
    if (settings && settings.listeningPorts && settings.notificationServerIsDown) {
      sendRequset(rawStorePingUrl, secretToken)({
        port: settings.listeningPorts
      });
    }
    eventEmitter.emit('get new settings', settings);
  });
};
