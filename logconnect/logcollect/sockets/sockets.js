const ioClient = require('socket.io-client');
const eventEmitter = require('../events');

const logviewURL = `http://35.242.250.124:80`;

module.exports = (companyId) => {
  const logviewSocket = ioClient.connect(logviewURL);

  logviewSocket.emit('logcollect get settings', companyId);

  logviewSocket.on('logview post settings', settings => {
    console.log('got settings');
    eventEmitter.emit('get new settings', settings);
  });
};
