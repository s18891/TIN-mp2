const crypto = require('crypto');
const User = require('../../model/sequelize/User');
const Rezerwacje = require('../../model/sequelize/Rezerwacje');

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password, 'utf8').digest().toString('hex');
}

exports.createUser = (auth) => {
  const user = { ...auth, isAdmin: false };
  user.password = hashPassword(user.password);
  return User.create(user);
};

exports.findUserByLoginAndPassword = (auth) => {
  const user = { ...auth };
  user.password = hashPassword(user.password);
  return User.findOne(
    {
      where: {
        login: auth.login,
        password: hashPassword(auth.password),
      },
      include: [{
        model: Rezerwacje,
        required: false,
      }],
    });
}
