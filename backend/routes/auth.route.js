const app = require('express');
const router = app.Router();

const passport = require('passport');

router.post('/login', function (req, res, next) {
  passport.authenticate(
    'local',

    async (err, user, info) => {
      if (!user) {
        res.send(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        const response = {
          user,
          token: user.token,
        };
        delete response.user.token;
        res.send(response);
      });
    }
  )(req, res, next);
});
router.delete('/logout', (req, res) => {
  req.logOut(() => {
    res.send({
      message: 'Logged out Successfully!',
    });
  });
});

module.exports = router;
