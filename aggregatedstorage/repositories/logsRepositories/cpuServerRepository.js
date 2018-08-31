const GeneralRepository = require('./generalRepository.js');
const CpuServerModel = require('../../db/models/cpuServer');

class CpuServer extends GeneralRepository {
  constructor() {
    super(CpuServerModel);
  }

  create(log, callback) {
    const cpuServerLog = {
      companyId: log.companyToken,
      timestamp: log.timestamp,
      cores: log.data.cores,
      totalLoadPercentages: log.data.totalLoad,
    };
    CpuServerModel.create(cpuServerLog, callback);
  }
}

module.exports = new CpuServer();
