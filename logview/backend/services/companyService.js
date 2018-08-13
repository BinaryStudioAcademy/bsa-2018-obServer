const companyRepository = require('../domains/postgres/repositories/companyRepository'),
	crypto = require('crypto');

class CompanyService {
	constructor() {
		this.saltRounds = 8;
	}

	validateName(name) {
		if (!name || name.search(/\S/g) < 0) {
			throw new Error(`The Company's name should not be empty`);
		}
		if (name.search(/[!@#$%^&*]/g) >= 0) {
			throw new Error(
				`In the Company's name is incorrect symbol [!@#$%^&*]`
			);
		}
		return true;
	}

	generateToken() {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(20, (err, buf) => {
				const token = buf.toString('hex');
				if (err) reject(err);
				resolve(token);
			});
		});
	}

	async create(name) {
		if (this.validateName(name)) {
			const newCompany = {};
			newCompany.name = name;
			newCompany.token = await this.generateToken();
			return companyRepository.create(newCompany);
		}
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
