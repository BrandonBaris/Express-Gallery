var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, require : true },
  password: { type: String, require : true }
});

UserSchema.methods.validPassword = function (password) {
  return this.password == password;
};

module.exports = mongoose.model( 'users', UserSchema );