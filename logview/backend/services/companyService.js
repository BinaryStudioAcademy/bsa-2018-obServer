const companyRepository = require('../domains/postgres/repositories/companyRepository')
	.model;

class CompanyService {
	constructor() {}

	async create(data) {
		if (!(await this.findByName(data.name))) {
			// return companyRepository.create(bodydata);
			return companyRepository.create(data);
		} else {
			throw new Error(`${data.name} is already in use`);
		}
		// // decide wether name is unique; if not:
		// // return companyRepository.create(data);
		// // leveled up variant:
		// return companyRepository.create(data);
	}

	findAll() {
		// return companyRepository.read();
		return companyRepository.findAll();
	}

	findById(id) {
		// return companyRepository.findById(id);
		return companyRepository.findById(id);
	}

	/**
	 * Method is used for verification of the provided name - it should be unique
	 * @param {*} name
	 */
	findByName(name) {
		// return companyRepository.findByName(name);
		return companyRepository.findOne({ where: { name: name } });
	}

	update(id, newData) {
		// return companyRepository.update(id, newData);
		return companyRepository.update(newData, { where: { id: id } });
	}

	delete(id) {
		// return companyRepository.delete(id);
		return companyRepository.destroy({ where: { id: id } });
	}

	// alternating services by id-or-name

	// updateByName(name, newData) {
	//     // return companyRepository.updateByName(name, newData);
	//     return companyRepository.update(newData, { where: { name: name } });
	// }

	// deleteByName(name) {
	//     // return companyRepository.deleteByName(name);
	//     return companyRepository.destroy({ where: { name: name } });
	// }
}

module.exports = new CompanyService();
