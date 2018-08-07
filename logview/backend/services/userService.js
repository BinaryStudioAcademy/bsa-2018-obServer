const //bcrypt = require("bcrypt"),
UserRepository = require("../domains/postgres/repositories/userRepository");

class UserService {
  static get saltRounds() {
    return 8;
  }

  // encryptPassword(password) {
  //   bcrypt.hash(password, this.saltRounds, (err, hash) => {
  //     if (!err) return hash;
  //   });
  // }

  // validPassword(password, hash) {
  //   bcrypt.compare(password, hash, (err, res) => {
  //     return res;
  //   });
  // }

  create(body) {
    //body.password = this.encryptPassword(body.password);
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

  findById(id) {
    return UserRepository.findById(id);
  }

  findByEmail(email) {
    return UserRepository.findByEmail(email);
  }
}

module.exports = new UserService();
