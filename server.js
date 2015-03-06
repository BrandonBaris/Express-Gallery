var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use( express.static( __dirname + '/app') );
app.set( 'view engine', 'jade' );

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var galleryItem = new Schema({
  author : { type : String, required : true },
  link : { type : String, required : true },
  description : String,
  created_at : { type : Date, default: Date.now() }
});

var galleryItem = mongoose.model( 'photos', galleryItem );
// --- index ---
app.get('/', function (req, res) {
  galleryItem.find(function(err,photos){

  if (err) throw err;
  res.render('index', {photos : photos});

  });
});

// --- new gallery render---
app.get('/new_photo', function (req, res) {
  res.render('new_photo');
});

// --- editing gallery ---
app.get('/photos/:_id/edit', function (req, res) {
  var photoId = req.params._id;
  var query = galleryItem.where({ _id : photoId });

  query.findOne(function( err, photos ){
    if (err) throw err;
    res.render('edit', { photos : photos });
  });
});

// --- posting/creating a new gallery
app.post('/photos', function(req, res) {

  var photos = new galleryItem({
    author : req.body.author || "",
    description : req.body.description || ""
  });

  photos.save( function ( err, photos ) {
    // if (err) throw err;
    res.redirect( "/" );
  });
});

// --- updating gallery via edit ---
app.put('/photos/:_id', function(req, res) {
  var photoId = req.params._id;
  var author = req.body.author;
  var description = req.body.description;
  var query = galleryItem.find({ _id : photoId });
  query.update({author: author, description: description }, function( err ){
    if (err) throw err;
    res.redirect( '/' );
  });
});

// --- deletion of gallery item ---
app.delete('/photos/:_id', function(req, res) {
  var photoId = req.params._id;
  var query = galleryItem.find({ _id : photoId });
  query.remove(function( err ){
    if (err) throw err;
    res.redirect( '/' );
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Gallery app listening at http://%s:%s', host, port);

});