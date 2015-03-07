var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var gallery = require('./controllers/gallery');
var auth = require('./controllers/auth');

var app = express();

app.use( express.static( __dirname + '/app') );

app.use(session({ secret: 'keyboard cat' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');
app.set( 'view engine', 'jade' );

mongoose.connect('mongodb://localhost/photos');

app.use( auth );
app.use( '/gallery', gallery );

// render main gallery
app.get( '/', gallery.list );
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Gallery app listening at http://%s:%s', host, port);

});