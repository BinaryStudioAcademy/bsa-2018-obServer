const AppLogGeneralRepository = require('./appLogGeneralRepository');
const MemoryAppModel = require('../../db/models/memoryApp');

class MemoryApp extends AppLogGeneralRepository {
  constructor() {
    super(MemoryAppModel);
  }

  create(log, callback) {
    const memoryAppLog = {
      companyId: log.companyToken,
      appId: log.appId,
      timestamp: log.timestamp,
      heap: {
        total: log.data.heapTotal,
        used: log.data.heapUsed
      }
    };

    this.model.create(memoryAppLog, callback);
  }
}

module.exports = new MemoryApp();

