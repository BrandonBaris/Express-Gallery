var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var gallery = require('./controllers/gallery');
var auth = require('./controllers/auth');
mongoose.connect('mongodb://localhost/photos');
// var User = require('../models/user');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use( express.static( __dirname + '/app') );
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', __dirname + '/views');
app.set( 'view engine', 'jade' );

// auth controller
app.use(auth);
app.use( '/gallery', gallery );

// render main gallery
app.get( '/', gallery.list );
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Gallery app listening at http://%s:%s', host, port);

});