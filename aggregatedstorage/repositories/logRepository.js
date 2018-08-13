const connection = require('../db/dbConnect');
const logMessage = require('../db/models/logMessage');

class LogRepository {
  constructor() {
    this.model = logMessage;
  }

  create(data, callback) {
    this.model.create(data, callback);
  }
}

module.exports = new LogRepository();