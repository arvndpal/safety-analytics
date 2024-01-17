const { checklUserCreds } = require('./controllers/auth.controller');
const { findOne, getUserById } = require('./controllers/employees.controller');

const LocalStrategy = require('passport-local').Strategy;

function initialize(passport) {
  const authUser = async (email, password, done) => {
    const result = await checklUserCreds(email, password);

    if (result.message) {
      return done(null, false, { message: result.message });
    }
    let authenticated_user = result;
    return done(null, authenticated_user);
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      authUser
    )
  );

  passport.serializeUser(function (user, done) {
    console.log('Passport.serializeUser function');
    if (user) done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('Passport.deserializeUser function');
    const user = await getUserById(id);
    done(null, user);
  });
}

module.exports = initialize;
