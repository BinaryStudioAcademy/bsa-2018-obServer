const logRepository = require('../repositories/logRepository');
const sendToQueue = require('./amqpService');

class LogService {
  create(logMessage, callback) {
    logRepository.create(logMessage, (err, logMessage) => {
      if (!err) {
        const { logType, data, timestamp, app, companyToken } = logMessage;
        sendToQueue(JSON.stringify({ logType, data, timestamp, app, companyToken }));
      }
      callback(err, logMessage);
    });
  }
}

module.exports = new LogService();