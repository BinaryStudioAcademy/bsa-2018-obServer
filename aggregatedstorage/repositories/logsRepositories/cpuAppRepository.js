const AppLogGeneralRepository = require('./appLogGeneralRepository');
const CpuAppModel = require('../../db/models/cpuApp');

class CpuApp extends AppLogGeneralRepository {
  constructor() {
    super(CpuAppModel);
  }

  create(log, callback) {
    const cpuAppLog = {
      companyId: log.companyToken,
      appId: log.appId,
      timestamp: log.timestamp,
      cpuUsagePercentages: log.data.cpuUsagePercentages
    };

    this.model.create(cpuAppLog, callback);
  }
}

module.exports = new CpuApp();

