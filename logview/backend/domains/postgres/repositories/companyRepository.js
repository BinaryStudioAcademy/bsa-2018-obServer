const ctx = require('../../../dbconnect/postgres');

class CompanyRepository {
	constructor() {
		this.model = ctx.sequelize.models.Company;
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

	findById(id) {
		return this.model.findById(id);
	}

	findByName(name) {
		return this.model.findOne({ where: { name: name } });
	}
}

module.exports = new CompanyRepository();
