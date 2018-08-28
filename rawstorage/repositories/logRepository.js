const connection = require('../db/dbConnect');
const logMessage = require('../db/models/logMessage');

class LogRepository {
  constructor() {
    this.model = logMessage;
  }

  create(data, callback) {
    this.model.create(data, callback);
  }

  findAll(companyId, appId, logType, callback) {
    if (logType && appId) {
      this.model.find({ companyToken: companyId, logType, 'app.id': appId }, callback);
      return;
    } else if (logType) {
      this.model.find({ companyToken: companyId, logType }, callback);
      return;
    }
    this.model.find({ companyToken: companyId }, callback);
  }
}

module.exports = new LogRepository();