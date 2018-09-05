const ctx = require('../../../dbconnect/postgres');

class AppRepository {
	constructor() {
		this.model = ctx.sequelize.models.App;
	}

	create(data) {
		return this.model.create(data);
	}

	read() {
		return this.model.findAll();
	}

	findByCompanyId(companyId) {
		return this.model.findAll({ where: { companyId: companyId } });
	}

	update(id, newData) {
		return this.model.update(newData, { where: { id: id } });
	}

	delete(id) {
		return this.model.destroy({ where: { id: id } });
	}
}

module.exports = new AppRepository();
