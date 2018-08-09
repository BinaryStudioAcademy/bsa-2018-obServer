const bcrypt = require('bcrypt'),
	UserRepository = require('../domains/postgres/repositories/userRepository');

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
			return UserRepository.create(body);
		} else {
			throw new Error(`${body.email} is already in use`);
		}
	}

	findAll() {
		return UserRepository.read();
	}

	update(id, newBody) {
		return UserRepository.update(id, newBody);
	}

	delete(id) {
		return UserRepository.delete(id);
	}

	findById(id) {
		return UserRepository.findById(id);
	}

	findByEmail(email) {
		return UserRepository.findByEmail(email);
	}
}

module.exports = new UserService();