const logRepository = require('../repositories/logRepository');

class LogService {
  create(logMessage, callback) {
    logRepository.create(logMessage, callback);
  }

  getLogsByCompanyId(id, callback) {
    logRepository.getByCompanyId(id, callback);
  }
}

module.exports = new LogService();