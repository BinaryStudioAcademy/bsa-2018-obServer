const bcrypt = require('bcrypt'),
	crypto = require('crypto'),
	userRepository = require('../domains/postgres/repositories/userRepository'),
	companyService = require('./companyService');

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

	generateUserToken() {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(20, (err, buf) => {
				const token = buf.toString('hex');
				if (err) reject(err);
				resolve(token);
			});
		});
	}

	async create(body) {
		if (!(await this.findByEmail(body.email))) {
			const hash = await this.encryptPassword(body.password);
			const token = await this.generateUserToken();
			body.password = hash;
			body.userActivationToken = token;

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

	findByResetPasswordToken(token) {
		return userRepository.findByResetPasswordToken(token);
	}

	findByUserActivationToken(token) {
		return userRepository.findByUserActivationToken(token);
	}
}

module.exports = new UserService();
