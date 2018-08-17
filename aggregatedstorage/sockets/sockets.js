const logService = require('../services/logService');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('client connected ');
    socket.on('config', (config) => {
      socket.join(config.companyToken);
    });
  });
};
