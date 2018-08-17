const logRepository = require('../repositories/logRepository');

class LogService {
  create(logMessage, callback) {
    logRepository.create(logMessage, callback);
  }
}

module.exports = new LogService();