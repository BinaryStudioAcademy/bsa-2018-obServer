const bcrypt = require('bcrypt'),
	crypto = require('crypto'),
	algorithm = 'aes-256-ctr',
	key = crypto.randomBytes(32),
	iv = crypto.randomBytes(16),
	userRepository = require('../domains/postgres/repositories/userRepository'),
	companyService = require('./companyService'),
	settingService = require('./settingService'),
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

	encryptData(data) {
		const cipher = crypto.createCipheriv(algorithm, key, iv);
		return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
	}

	decryptData(data) {
		const decipher = crypto.createDecipheriv(algorithm, key, iv);
		return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
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
			await settingService.create(newCompany.id);
			body.password = hash;
			body.userActivationToken = token;
			body.companyId = newCompany.id;
			body.admin = true;
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

	async inviteUserIfNotExist(req) {
		const { name, email, admin } = req.body;
		const inviter = req.user;
		const token = await this.generateUserToken();
		const password = await this.generateUserToken();
		const data = {
			name: name,
			email: email,
			password: password,
			inviteToken: token,
			companyId: inviter.companyId,
			admin: admin ? true : false
		};
		const newUser = await this.createByInvite(data);
		const link = `http://${req.headers.host}/setpassword/?inviteToken=${
			newUser.inviteToken
		}`;
		this.createAndSendInviteLetter(newUser, inviter, link);
	}

	async inviteUserIfExist(req, user) {
		const inviter = req.user;
		const { admin } = req.body;
		const data = JSON.stringify({
			companyId: inviter.companyId,
			admin: admin ? true : false
		});
		const token = await this.encryptData(data);
		if (await this.update(user.id, { inviteToken: token })) {
			const updatedUser = await this.findById(user.id);
			const link = `http://${req.headers.host}/?inviteToken=${
				updatedUser.inviteToken
			}`;
			this.createAndSendInviteLetter(updatedUser, inviter, link);
		} else throw new Error('Problems during update');
	}

	createAndSendInviteLetter(user, inviter, link) {
		const letterBody = {
			name: user.name,
			inviter: inviter.name,
			link: link
		};
		const letter = seedLetter.invite(letterBody);
		emailService.sendEmail(letter, user.email);
	}

	async invite(req) {
		const { email } = req.body;
		const user = await this.findByEmail(email.toLowerCase());
		if (!user) this.inviteUserIfNotExist(req);
		else this.inviteUserIfExist(req, user);
	}

	async activateByInvite(req) {
		const user = await this.findByInviteToken(req.params.inviteToken);
		if (!user.active) {
			const { newPassword } = req.body;
			const update = {
				password: await this.encryptPassword(newPassword),
				active: true
			};
			if (await this.update(user.id, update)) {
				const letterBody = {
					name: user.name
				};
				const letter = seedLetter.setPassword(letterBody);
				emailService.sendEmail(letter, user.email);
			} else throw new Error('Problems during updating');
		} else throw new Error('You are already in system');
	}

	async addUserToCompany(req) {
		const user = await this.findByInviteToken(req.params.inviteToken);
		const { companyId, admin } = JSON.parse(
			this.decryptData(user.inviteToken)
		);
		const update = {
			companyId: companyId,
			admin: admin
		};
		if (await this.update(user.id, update)) {
			const updatedUser = await this.findById(user.id);
			const letterBody = {
				name: updatedUser.name,
				company: (await companyService.findById(updatedUser.companyId))
					.name
			};
			const letter = seedLetter.addToCompany(letterBody);
			emailService.sendEmail(letter, updatedUser.email);
		} else throw new Error('Problems during updating');
	}

	async deleteUserFromCompany(req) {
		const { email } = req.body;
		const user = await this.findByEmail(email);
		const newCompany = await companyService.create(user.name);
		const update = {
			admin: true,
			companyId: newCompany.id
		};
		await settingService.create(newCompany.id);
		await this.update(user.id, update);
	}

	async changeUserRights(req) {
		const { email, admin } = req.body;
		const user = await this.findByEmail(email);
		const update = {
			admin: admin ? true : false
		};
		if (!(await this.update(user.id, update))) {
			throw new Error('Problems during update');
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

	findByInviteToken(token) {
		return userRepository.findByInviteToken(token);
	}

	findUsersOfCompany(companyId) {
		return userRepository.findUsersOfCompany(companyId);
	}
}

module.exports = new UserService();
