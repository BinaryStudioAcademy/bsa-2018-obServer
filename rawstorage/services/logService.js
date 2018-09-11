const logRepository = require('../repositories/logRepository');
const sendToQueue = require('./amqpService');
const logTypes = require('../utils/logTypes');

class LogService {
  create(logMessage, callback) {
    logRepository.create(logMessage, (err, logMessage) => {
      if (!err) {
        const { logType, data, timestamp, appId, companyToken } = logMessage;
        sendToQueue(JSON.stringify({ logType, data, timestamp, appId, companyToken }));
      }
      callback(err, logMessage);
    });
  };
}

module.exports = new LogService();