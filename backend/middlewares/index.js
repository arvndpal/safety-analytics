exports.checkLoggedIn = (req, res, next) => {
  console.log('in [checkLoggedIn]', req.isAuthenticated());
  if (!req.isAuthenticated()) {
    res.status(400).send({
      message: 'Login Required. Please login first, then try again.',
    });
    return;
  }
  next();
};
