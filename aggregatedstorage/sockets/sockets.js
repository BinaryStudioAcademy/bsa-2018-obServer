const logService = require('../services/logService');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('client connected ');

    socket.on('getLogs', (companyToken, res) => {
      logService.getLogsByCompanyByDaysFromNow(companyToken, 1, (err, data) => {
        if(!err) {
          res(data);
        } else {
          res(err.message);
        }
      });
    });
  });
};
