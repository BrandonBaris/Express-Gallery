var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use( express.static( __dirname + '/app') );
app.set('views', __dirname + '/views');
app.set( 'view engine', 'jade' );

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photos');
var Schema = mongoose.Schema;
var GalleryItemSchema = new Schema({
  author : { type : String, required : true },
  image : { type : String, required : true },
  description : String,
  created_at : { type : Date, default: Date.now() }
});


var GalleryItem = mongoose.model( 'photo', GalleryItemSchema );

// --- index ---
app.get('/', function (req, res) {
  GalleryItem.find(function(err, photoInDb){
    if (err) throw err;
    // console.log(photos.image);
    res.render('index', { photos : photoInDb});
  });
});

// --- new gallery render---
app.get('/new_photo', function (req, res) {
  res.render('new');
});

// --- editing gallery ---
app.get('/gallery/:id/edit', function (req, res) {
  var photoId = req.params.id;
  var query = GalleryItem.where({ id : photoId });

  query.findOne(function( err, photoInDb ){
    if (err) throw err;
    res.render('edit', { photos : photoInDb });
  });
});

// --- posting/creating a new gallery
app.post('/gallery', function(req, res) {

  var photos = new GalleryItem({
    author : req.body.author,
    image : req.body.link,
    description : req.body.description || ""
  });

  photos.save( function ( err, photo ) {
    if (err) throw err;
    res.redirect( '/' );
  });
});

// --- updating gallery via edit ---
app.put('/gallery/:id', function(req, res) {
  var photoId = req.params.id;
  var author = req.body.author;
  var description = req.body.description;
  var query = GalleryItem.find({ id : photoId });
  query.update({author: author, description: description }, function( err ){
    if (err) throw err;
    res.redirect( '/' );
  });
});

// --- deletion of gallery item ---
app.delete('/gallery/:id', function(req, res) {
  var photoId = req.params.id;
  var query = GalleryItem.find({ id : photoId });
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