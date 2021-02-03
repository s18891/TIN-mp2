const SluchaczeRespository = require("../repository/sequelize/SluchaczeRepository");
exports.isLoggedIn = (req) => {
  console.log("WEJŚCIE W SPRAWDZENIE LOGOWANIA w guars.js")
  const user = req.session.user;
  if (!user) {
    req.session.redirectAfterLogin = req.originalUrl;
  }

  return !!user;
}
///UWAGA metoda zawiera podatność podszycia się pod admina
exports.isAdmin = (req) => {
  console.log("WEJŚCIE W SPRAWDZENIE ADMINA w guars.js")
  const user = req.session.user;
  console.log( JSON.stringify(user));
  if ( JSON.stringify(user).includes(',"isAdmin":true,')){
    console.log( "ADMIN TRUE");

    return true
  }else {

    console.log("ADMIN FALSE");

    return false;
  }
}

