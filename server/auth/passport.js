const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'username', // Use 'username' as the username field
    passwordField: 'password'
  },
  (username, password, done) => {
    User.findOne({ username: username })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false, { message: 'Invalid username or password' });
        }
        return done(null, user);
      });
    })
    .catch(err => done(err));
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .select('-password') 
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
});

module.exports = passport;