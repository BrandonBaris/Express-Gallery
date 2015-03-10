var express = require('express');
var router = express.Router();
var GalleryItem = require('../models/photo');

function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// --- index ---
router.list = function (req, res) {
  GalleryItem.find(function(err, photoInDb){
    if (err) throw err;
    res.render('index', { photos : photoInDb});
  });
};

// --- new gallery render---
router.get('/new', ensureAuthenticated, function (req, res) {
  res.render('new');
});

// --- editing gallery ---
router.get('/:id/edit', ensureAuthenticated, function (req, res) {
  var photoId = req.params.id;
  var query = GalleryItem.where({ _id : photoId });

  query.findOne(function( err, photoInDb ){
    if (err) throw err;
    console.log(photoInDb);
    res.render('edit', { photo : photoInDb });
  });
});

// --- admin ---
router.get('/admin', ensureAuthenticated, function (req, res) {
  GalleryItem.find(function (err, photoInDb){
    if (err) throw err;
    res.render('auth/admin', {photos : photoInDb, user : req.user });
  });
});

// --- new gallery render---
router.get('/new', function (req, res) {
  res.render('new');
});

// --- posting/creating a new gallery
router.post('/', ensureAuthenticated, function(req, res) {

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
router.put('/:id',  ensureAuthenticated, function(req, res) {
  var photoId = req.params.id;
  var image = req.body.image;
  var author = req.body.author;
  var description = req.body.description;
  GalleryItem.findOneAndUpdate( {_id: photoId}, { image: image, author: author, description: description }, function( err ){
    if (err) throw err;
    res.redirect( '/' );
  });
});

// --- deletion of gallery item ---
router.delete('/:id',  ensureAuthenticated, function(req, res) {
  var photoId = req.params.id;
  var query = GalleryItem.find({ _id : photoId });
  query.remove(function( err ){
    if (err) throw err;
    res.redirect( '/' );
  });
});

module.exports = router;
