const SluchaczeRespository = require("../repository/sequelize/SluchaczeRepository");
exports.isLoggedIn = (req) => {
  console.log("WEJŚCIE W SPRAWDZENIE LOGOWANIA w guars.js")
  const user = req.session.user;
  if (!user) {
    req.session.redirectAfterLogin = req.originalUrl;
  }

  return !!user;
}

exports.isAdmin = (req) => {
  console.log("WEJŚCIE W SPRAWDZENIE ADMINA w guars.js")
  const user = req.session.user;
  console.log(user);
  if (!user) {
    req.session.redirectAfterLogin = req.originalUrl;
  }

  return !!user;
}

