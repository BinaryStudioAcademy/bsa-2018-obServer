const GeneralRepository = require('./generalRepository');

module.exports = class AppLogGeneralRepository extends GeneralRepository {
  constructor(model) {
    super(model);
  }

  getByCompanyIdAndAppId(companyId, appId, callback) {
    this.model.find({ companyId, appId }, callback);    
  }
}
