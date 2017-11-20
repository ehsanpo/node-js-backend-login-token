var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');


const {Initializer, api} = require('actionhero')

module.exports = class mongoose2 extends Initializer {
  constructor () {
    super()
    this.name = 'mongoose2'
    this.loadPriority = 1000
    this.startPriority = 1000
    this.stopPriority = 1000
  }

  async initialize () {

  api.dbmongoose= mongoose ;
  api.mongoose = {
    mongoose: mongoose,
    connection: null,
    models: null,
    _teardown: function(api, next) {
      
    },
    init: function(callback) {
      if(api.mongoose.models === null) {
        api.mongoose.models = {};
      }
      var dir = path.normalize(api.config.mongoose.model_path);
       fs.readdirSync(dir).filter(function(file) { return file.substr(-3) === '.js'; })
      .forEach(function(file) {
        var nameParts = file.split("/");
        var name = nameParts[(nameParts.length - 1)].split(".")[0];
        if(name.indexOf('-') > -1) {
          name = name.split("-")[1];
        }
        api.mongoose.models[name] = require(api.config.mongoose.model_path + '/' + file);
      });
      callback();
    },
    connect: function(callback) {
      if(api.mongoose.models === null) {
        api.mongoose.init(function(){});
      }
      api.mongoose.mongoose.connect(api.config.mongoose.connection_string);
      api.mongoose.connection = mongoose.connection;
      api.mongoose.connection.on('error', console.error.bind(console, 'mongoose error:'));
    },
    disconnect: function(callback) {
      api.mongoose.mongoose.disconnect(callback);
    }
  };
       if(api.mongoose.models === null) {
        api.mongoose.models = {};
      }
      var dir = path.normalize(api.config.mongoose.model_path);
      fs.readdirSync(dir).filter(function(file) { return file.substr(-3) === '.js'; })
      .forEach(function(file) {
        var nameParts = file.split("/");
        var name = nameParts[(nameParts.length - 1)].split(".")[0];
        if(name.indexOf('-') > -1) {
          name = name.split("-")[1];
        }

        api.mongoose.models[name] = require(api.config.mongoose.model_path + '/' + file);
      });


  }

  async start () {
      if(api.config.mongoose.auto_start) {
        api.mongoose.connect(function() {
      });
    }
  }

}

