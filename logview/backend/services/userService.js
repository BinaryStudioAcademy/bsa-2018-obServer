const bcrypt = require("bcrypt"),
  saltRounds = 8;

module.exports = {
  encryptPassword(password) {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (!err) return hash;
    });
  },

  validPassword(password, hash) {
    bcrypt.compare(password, hash, (err, res) => {
      return res;
    });
  }
};
