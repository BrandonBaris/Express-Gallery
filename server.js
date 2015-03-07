var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var gallery = require('./controllers/gallery');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use( express.static( __dirname + '/app') );
app.set('views', __dirname + '/views');
app.set( 'view engine', 'jade' );

mongoose.connect('mongodb://localhost/photos');

app.use( '/gallery', gallery );

// render main gallery
app.get( '/', gallery.list );
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Gallery app listening at http://%s:%s', host, port);

});