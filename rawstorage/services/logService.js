const logRepository = require('../repositories/logRepository');
const sendToQueue = require('./amqpService');
const logTypes = require('../utils/logTypes');

class LogService {
  create(logMessage, callback) {
    logRepository.create(logMessage, (err, logMessage) => {
      if (!err) {
        const { logType, data, timestamp, app, companyToken } = logMessage;
        sendToQueue(JSON.stringify({ logType, data, timestamp, app, companyToken }));
      }
      callback(err, logMessage);
    });
  };

  getLogsByCompanyId(companyId, appId, logType, callback) {
    switch (logType) {
      case 'memoryserver':
        logRepository.findAll(companyId, logTypes.MEMORY_SERVER, callback);
        break;
      case 'cpuserver':
        logRepository.findAll(companyId, logTypes.CPU_SERVER, callback);
        break;
      case 'http':
        logRepository.findAll(companyId, appId, logTypes.HTTP_STATS, callback);
        break;
      default:
        logRepository.findAll(companyId, null, callback);
    }
  }
}

module.exports = new LogService();