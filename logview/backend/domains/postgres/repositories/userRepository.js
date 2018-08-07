const ctx = require("../../../dbconnect/postgres");

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
  update(id, newBody) {
    return this.model.update(newBody, { where: { id: id } });
  }
  delete(id) {
    return this.model.destroy({ where: { id: id } });
  }
}

module.exports = new UserRepository();
