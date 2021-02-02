const UserRepository = require('../repository/sequelize/UserRepository');

exports.getLogin = async (req, res, next) => {
  return res.render('login', {
    auth: {},
    isError: false,
  });
}

exports.getLogout = async (req, res, next) => {
////////////////////////// nie działa
  req.session.close();

  return res.redirect('/');


}

exports.postLogin = async (req, res, next) => {
  const auth = { ...req.body };
  const user = await UserRepository.findUserByLoginAndPassword(auth);
  if (!user) {
    return res.render('login', {
      auth: auth,
      isError: true,
    });
  }
  req.session.user = user;

  return res.redirect('/');
}

exports.getRegister = async (req, res, next) => {
  res.render('register', {
    auth: {},
    validationErrors: [],
  });
}

exports.postRegister = async (req, res, next) => {
  const auth = { ...req.body };
  if (!auth.password || auth.password.length < 5) {
    return res.render('register', {validationErrors: [{path: 'password', message: 'Wymagane więcej niż 4 znaki'}], auth: auth});
  }
  try {
    await UserRepository.createUser({...auth});
  }  catch (e) {
    return res.render('register', {validationErrors: e.errors, auth: auth});
  }

  return res.render('login');
}
