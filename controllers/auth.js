var express = require('express');
var router = express.Router();
var User = require('../models/user');
var GalleryItem = require('../models/photo');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/login', function (req, res) {
  res.render('auth/login');
});

router.authenticate = passport.authenticate('local', { 
  successRedirect: '/gallery/admin',
  failureRedirect: '/login'
});

//                    v---- middleware
router.post('/login', router.authenticate);

// --- logout ---
router.get('/logout', function ( req, res ) {

  req.logout();
  res.redirect('/');
});

module.exports = router;

