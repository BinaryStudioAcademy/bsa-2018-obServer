const bcrypt = require('bcrypt'),
	crypto = require('crypto'),
	userRepository = require('../domains/postgres/repositories/userRepository'),
	companyService = require('./companyService'),
	apiResponse = require('express-api-response');

class UserService {
	constructor() {
		this.saltRounds = 8;
	}

	async encryptPassword(password, callback) {
		return await bcrypt.hash(password.toString(), this.saltRounds);
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

	isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.data = {
				status: 403,
				message: 'failed login',
				isAuth: false
			};
			res.err = new Error('you are not logged in');
			apiResponse(req, res, next);
		}
	}

	async create(body) {
		if (!(await this.findByEmail(body.email))) {
			const hash = await this.encryptPassword(body.password);
			const token = await this.generateUserToken();
			const newCompany = await companyService.create(body.company);
			body.password = hash;
			body.userActivationToken = token;
			body.companyId = newCompany.id;
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
