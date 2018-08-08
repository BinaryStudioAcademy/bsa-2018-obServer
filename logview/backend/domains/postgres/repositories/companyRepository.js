const ctx = require('../../../dbconnect/postgres');

class CompanyRepository {
	constructor() {
		this.model = ctx.sequelize.models.Company;
	}

	// for refactoring code level up variant
	// create(data) {
	// 	return this.model.create(data);
	// }

	// read() {
	// 	return this.model.findAll();
	// }

	// update(id, newData) {
	// 	return this.model.update(newData, { where: { id: id } });
	// }

	// delete(id) {
	// 	return this.model.destroy({ where: { id: id } });
	// }

	// updateByName(name, newData) {
	// 	return this.model.update(newData, { where: { name: name } });
	// }

	// deleteByName(name) {
	// 	return this.model.destroy({ where: { name: name } });
	// }

	// findById(id) {
	// 	return this.model.findById(id);
	// }

	// findByName(name) {
	// 	return this.model.findOne({ where: { name: name } });
	// }
}

module.exports = new CompanyRepository();
