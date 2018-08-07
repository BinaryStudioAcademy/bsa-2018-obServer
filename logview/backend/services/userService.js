const bcrypt = require("bcrypt"),
  UserRepository = require("../domains/postgres/repositories/userRepository");

class UserService {
  static get saltRounds() {
    return 8;
  }
  encryptPassword(password) {
    bcrypt.hash(password, this.saltRounds, (err, hash) => {
      if (!err) return hash;
    });
  }
  validPassword(password, hash) {
    bcrypt.compare(password, hash, (err, res) => {
      return res;
    });
  }

  create(body) {
    return UserRepository.create(body);
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
}

module.exports = new UserService();
