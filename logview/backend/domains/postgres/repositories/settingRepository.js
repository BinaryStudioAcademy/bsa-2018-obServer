const ctx = require('../../../dbconnect/postgres');

class SettingRepository {
	constructor() {
		this.model = ctx.sequelize.models.Setting;
	}
	create(data) {
		return this.model.create(data);
	}
	read() {
		return this.model.findAll();
	}
	update(id, newData) {
		return this.model.update(newData, { where: { id: id } });
	}
	delete(id) {
		return this.model.destroy({ where: { id: id } });
	}
	findByCompanyId(companyId) {
		return this.model.findOne({ where: { companyId: companyId } });
	}
}

module.exports = new SettingRepository();
