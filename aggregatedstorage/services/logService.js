const logRepository = require('../repositories/logRepository');

class LogService {
  create(logMessage, callback) {
    logRepository.create(logMessage, callback);
  }

  getLogsByCompanyId(id, callback) {
    logRepository.getByCompanyId(id, callback);
  }

  getLogsByCompanyByDaysFromNow(id, daysCount, callback) {
    let fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - daysCount);

    logRepository.getByCompanyIdByDaysFromNow(id, fromDate, callback);
  }
}

module.exports = new LogService();