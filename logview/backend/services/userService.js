const bcrypt = require('bcrypt'),
	companyService = require('./companyService'),
	userRepository = require('../domains/postgres/repositories/userRepository');

class UserService {
	constructor() {
		this.saltRounds = 8;
	}

	encryptPassword(password) {
		return bcrypt.hash(password, this.saltRounds).then(hash => {
			return hash;
		});
	}

	validPassword(password, hash) {
		return bcrypt.compare(password, hash).then(res => {
			return res;
		});
	}

	async create(body) {
		if (!(await this.findByEmail(body.email))) {
			const hash = await this.encryptPassword(body.password);
			body.password = hash;
			if (body.companyName) {
				const newCompany = await companyService.create(
					body.companyName
				);
				body.companyId = newCompany.id;
			}
			return userRepository.create(body);
		} else {
			throw new Error(`${body.email} is already in use`);
		}
	}

	findAll() {
		return userRepository.read();
	}

	update(id, newBody) {
		return userRepository.update(id, newBody);
	}

	delete(id) {
		return userRepository.delete(id);
	}

	findById(id) {
		return userRepository.findById(id);
	}

	findByEmail(email) {
		return userRepository.findByEmail(email);
	}
}

module.exports = new UserService();
