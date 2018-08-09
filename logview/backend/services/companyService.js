const companyRepository = require('../domains/postgres/repositories/companyRepository'),
	bcrypt = require('bcrypt');

class CompanyService {
	constructor() {
		this.saltRounds = 8;
	}

	/**
	 * Creates random unique token for company-database
	 * @param {*} name
	 */
	createToken(name) {
		return bcrypt.hash(name, this.saltRounds).then(hash => {
			return hash;
		});
	}

	async create(name) {
		const newCompany = {};
		newCompany.name = name;
		newCompany.token = await this.createToken(name);
		return companyRepository.create(newCompany);
	}

	findAll() {
		return companyRepository.read();
	}

	findById(id) {
		return companyRepository.findById(id);
	}

	update(id, newData) {
		return companyRepository.update(id, newData);
	}

	delete(id) {
		return companyRepository.delete(id);
	}
}

module.exports = new CompanyService();
