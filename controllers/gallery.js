var express = require('express');
var router = express.Router();
module.exports = router;
var GalleryItem = require('../models/photo');

// --- index ---
router.list =  function (req, res) {
  GalleryItem.find(function(err, photoInDb){
    if (err) throw err;
    // console.log(photos.image);
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

// --- posting/creating a new gallery
router.post('/', function(req, res) {

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
router.put('/:id', function(req, res) {
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
router.delete('/:id', function(req, res) {
  var photoId = req.params.id;
  var query = GalleryItem.find({ id : photoId });
  query.remove(function( err ){
    if (err) throw err;
    res.redirect( '/' );
  });
});
