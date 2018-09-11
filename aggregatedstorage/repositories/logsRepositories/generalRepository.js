module.exports = class GeneralRepository {
  constructor(model) {
    this.model = model;
  }

  create(log, callback) {
    this.model.create(log, callback);
  }

  getByCompanyId(companyId, callback) {
    const recentDays = new Date();
    recentDays.setDate(recentDays.getDate() - 30);
    this.model.find(
      { companyId, timestamp: { $gt: recentDays }},
      { companyId: 0, __v: 0 },
      callback
    ); 
  }
}
