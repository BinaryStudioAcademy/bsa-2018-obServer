const GeneralRepository = require('./generalRepository');

module.exports = class AppLogGeneralRepository extends GeneralRepository {
  constructor(model) {
    super(model);
  }

  getByCompanyIdAndAppId(companyId, appId, callback) {
    const recentDays = new Date();
    recentDays.setDate(recentDays.getDate() - 30);
    this.model.find(
      { companyId, appId, timestamp: { $gt: recentDays }},
      { companyId: 0, __v: 0 },
      callback
    );    
  }
}
