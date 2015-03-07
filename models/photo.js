var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var GalleryItemSchema = new Schema({
  author : { type : String, required : true },
  image : { type : String, required : true },
  description : String,
  created_at : { type : Date, default: Date.now() }
});
module.exports = mongoose.model( 'photo', GalleryItemSchema );