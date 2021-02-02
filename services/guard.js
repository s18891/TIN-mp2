exports.isLoggedIn = (req) => {
  const user = req.session.user;
  if (!user) {
    req.session.redirectAfterLogin = req.originalUrl;
  }

  return !!user;
}
