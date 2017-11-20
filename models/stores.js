var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = mongoose.Types;
var bcrypt = require('bcrypt-nodejs');

var mainStoreSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    required: false
  },
  name: {
    type: String,
    required: true,
     unique: true
  }
});
// Create the mongoose model
var main_model = mongoose.model('MainStore', mainStoreSchema );



var StoresSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mainstore:[
      {type: Schema.Types.ObjectId, ref: 'MainStore'}
    ]
});




// Create the mongoose model
var _model = mongoose.model('Stores', StoresSchema );





module.exports = {    
  schema : mainStoreSchema,
  model : _model,
  main_model : main_model,
}