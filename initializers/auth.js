const path = require('path');
const fs = require('fs');

var jsonwebtoken = require('jsonwebtoken');

const {Initializer, api} = require('actionhero')

module.exports = class jsonToken extends Initializer {
  constructor () {
    super()
    this.name = 'jsonToken'
    this.loadPriority = 999
    this.startPriority = 999
    this.stopPriority = 999
  }

  async initialize () {
        api.jwtauth = {
            processToken: function(token) {
                 return new Promise(function(resolve, reject) {

                    jsonwebtoken.verify(token, api.config.jwtauth.secret, {}, function(err, data) {
                        err ? reject(0) : resolve(1);
                    });

                });
              
            },
            generateToken: function(data, options, success, fail) {

                // identify parameter format
                if (typeof(options) == 'function') {
                    fail = success;
                    success = options;
                    options = {};
                }
                else {
                    options = options ||  {};
                }
                if (!options.algorithm) {
                    options.algorithm = api.config.jwtauth.algorithm;
                }

                try {
                    var token = jsonwebtoken.sign(data, api.config.jwtauth.secret, options);
                    if (success) {
                        success(token);
                    }
                }
                catch (err) {
                    if (fail) {
                        fail(err);
                    }
                }
            }
        };

  }
}