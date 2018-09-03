const AppLogGeneralRepository = require('./appLogGeneralRepository');
const LogMessageModel = require('../../db/models/logMessage');

class LogMessage extends AppLogGeneralRepository {
  constructor() {
    super(LogMessageModel);
  }

  create(log, callback) {
    const logMessage = {
      companyId: log.companyToken,
      appId: log.appId,
      timestamp: log.timestamp,
      logLevel: log.data.level,
      message: log.data.message
    };

    this.model.create(logMessage, callback);
  }
}

module.exports = new LogMessage();

