const bcrypt = require('bcrypt'),
	crypto = require('crypto'),
	userRepository = require('../domains/postgres/repositories/userRepository'),
	companyService = require('./companyService'),
	emailService = require('./emailService'),
	seedLetter = require('../emailSeeders');

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

	async create(body) {
		body.email = body.email.toLowerCase();
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

	async createByInvite(body) {
		body.email = body.email.toLowerCase();
		const hash = await this.encryptPassword(body.password);
		body.password = hash;
		return userRepository.create(body);
	}

	async invite(req) {
		const { name, email } = req.body;
		const { companyId } = req.user;
		if (!(await this.findByEmail(email.toLowerCase()))) {
			const token = await this.generateUserToken();
			const password = await this.generateUserToken();
			const data = {
				name: name,
				email: email,
				password: password,
				inviteToken: token,
				companyId: companyId
			};
			const newUser = await this.createByInvite(data);
			const link = `http://${
				req.headers.host
			}/api/user/invite/?inviteToken=${newUser.inviteToken}`;
			const letterBody = {
				name: newUser.name,
				inviter: req.user.name,
				link: link
			};
			const letter = seedLetter.invite(letterBody);
			emailService.sendEmail(letter, newUser.email);
		} else throw new Error(`${email} is already in use`);
	}

	async activateByInvite(req) {
		const user = await this.findByInviteToken(req.params.inviteToken);
		if (!user.active) {
			let { newPassword } = req.body;
			const update = {
				password: await this.encryptPassword(newPassword),
				active: true
			};
			if (!(await this.update(user.id, update)))
				throw new Error('Problems during updating');
			const letterBody = {
				name: user.name
			};
			const letter = seedLetter.setPassword(letterBody);
			emailService.sendEmail(letter, user.email);
		} else throw new Error('You are already in system');
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

	findByInviteToken(token) {
		return userRepository.findByInviteToken(token);
	}

	findUsersOfCompany(companyId) {
		return userRepository.findUsersOfCompany(companyId);
	}
}

module.exports = new UserService();
