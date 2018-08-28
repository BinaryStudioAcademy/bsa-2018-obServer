const ctx = require('../../../dbconnect/postgres');

class UserRepository {
	constructor() {
		this.model = ctx.sequelize.models.User;
	}
	create(data) {
		return this.model.create(data);
	}
	read() {
		return this.model.findAll();
	}
	update(id, newData) {
		return this.model.update(newData, { where: { id: id } });
	}
	delete(id) {
		return this.model.destroy({ where: { id: id } });
	}
	findById(id) {
		return this.model.findById(id);
	}
	findByEmail(email) {
		return this.model.findOne({ where: { email: email } });
	}
	findByResetPasswordToken(token) {
		return this.model.findOne({ where: { resetPasswordToken: token } });
	}
	findByUserActivationToken(token) {
		return this.model.findOne({ where: { userActivationToken: token } });
	}
	findByInviteToken(token) {
		return this.model.findOne({ where: { inviteToken: token } });
	}
	findUsersOfCompany(companyId) {
		return this.model.findAll({
			attributes: ['name', 'email', 'active'],
			where: { companyId: companyId }
		});
	}
}

module.exports = new UserRepository();
