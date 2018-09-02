const GeneralRepository = require('./generalRepository.js');
const MemoryServerModel = require('../../db/models/memoryServer');

class MemoryServer extends GeneralRepository {
  constructor() {
    super(MemoryServerModel);
  }

  create(log, callback) {
    const memoryServerLog = {
      companyId: log.companyToken,
      timestamp: log.timestamp,
      freeMemory: log.data.freeMemory,
      allMemory: log.data.allMemory,
      freeMemoryPercentage: log.data.freeMemoryPercentage
    };
    MemoryServerModel.create(memoryServerLog, callback);
  }
}

module.exports = new MemoryServer();

