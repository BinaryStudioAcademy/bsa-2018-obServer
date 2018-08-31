module.exports = class GeneralRepository {
  constructor(model) {
    this.model = model;
  }

  create(log, callback) {
    this.model.create(log, callback);
  }

  getByCompanyId(companyId, callback) {
    this.model.find({ companyId }, callback);
  }
}
