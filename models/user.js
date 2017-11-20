var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = mongoose.Types;
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

userSchema.virtual('full_name').get(function () {
  return this.first_name + ' ' + this.last_name;
});

userSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

userSchema.methods.generateHash = function (password) {

 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validateHash = function (password, password_post) {
   return bcrypt.compareSync(password_post, password);
}

// Create the mongoose model
var _model = mongoose.model('User', userSchema);


var _findByEmail = function(email, success, fail) {
  _model.findOne({email:email}, function(e, result) {
    if(e) {
      fail(e);
    } else {
     success(result);
   }
 });
}

module.exports = {    
  schema : userSchema,
  model : _model,
  findByEmail : _findByEmail
}