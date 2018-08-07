const ctx = require("../../../dbconnect/postgres");

class UserRepository {
  constructor() {
    this.model = ctx.sequelize.models.User;
  }
  create(data) {
    this.model.create(data);
  }
  read() {
    return this.model.findAll();
  }
  update() {}
  delete() {}
}

module.exports = new UserRepository();
