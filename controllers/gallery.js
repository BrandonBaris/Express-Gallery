var express = require('express');
var router = express.Router();
module.exports = router;
var GalleryItem = require('../models/photo');

function ensureAuthenticated( req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// --- index ---
router.list =  function (req, res) {
  GalleryItem.find(function(err, photoInDb){
    if (err) throw err;
    res.render('index', { photos : photoInDb});

  });
};

// --- new gallery render---
router.get('/new', function (req, res) {
  res.render('new');
});

// --- editing gallery ---
router.get('/:id/edit', function (req, res) {
  var photoId = req.params.id;
  var query = GalleryItem.where({ id : photoId });

  query.findOne(function( err, photoInDb ){
    if (err) throw err;
    res.render('edit', { photos : photoInDb });
  });
});

// ------- admin 
router.get('/admin', ensureAuthenticated, function ( req, res ) {
  GalleryItem.find(function(err, photoInDb){
    res.render('auth/admin', { photos : photoInDb, user : req.user });
  });
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
router.put('/:id', ensureAuthenticated, function(req, res) {
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
router.delete('/:id', ensureAuthenticated, function(req, res) {
  var photoId = req.params.id;
  var query = GalleryItem.find({ id : photoId });
  query.remove(function( err ){
    if (err) throw err;
    res.redirect( '/' );
  });
});
