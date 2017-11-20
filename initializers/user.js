const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const {Initializer, api} = require('actionhero')

module.exports = class user extends Initializer {
  constructor () {
    super()
    this.name = 'user'
    this.loadPriority = 1001
    this.startPriority = 1001
    this.stopPriority = 1001
  }

  async initialize () {
  const User= api.mongoose.models.user.model;
    api.user = {
      login: function (email, password){
        
         return new Promise(function(resolve, reject) {
          User.findOne({email: email}, 'password',(err, user) => {
            console.log(user);
              if (err) {
                  return done(err);
              }

              if (!user) {
                  let error = new Error('Incorrect email or password');
                  error.name = 'IncorrectCredentialsError';

                  return done(error);
              }
              // check if a hashed user's password is equal to a value saved in the database
              return user.comparePassword(password, (passwordErr, isMatch) => {
                  if (err) {
                      reject(err);
                  }

                  if (!isMatch) {
                      let error = new Error('Incorrect email or password');
                      error.name = 'IncorrectCredentialsError';

                      reject(error);
                  }

                  let payload = {
                      sub: user._id
                  };

                  let data = {};

                  console.log(api.jwtauth);
                    api.jwtauth.generateToken({id: user._id , email:email}, {expiresIn: "7d"}, function(token) {
                    data = {
                        email: user.email,
                        token: token,
                    };
                  }, function(err) {
                    reject(err);
                  });
                  resolve(data);

              });
          });
         });
      },
       find: function(id){
        return new Promise(function(resolve, reject) {
          User.findById(id, function (err, myDocument) {
             if (err){
                reject(err.message);
              }
              resolve(myDocument);
          });
        });

      },
      update: function(id,data){
         return new Promise(function(resolve, reject) {
            /* check if exists */
            
            User.findById(id, function (err, myDocument) {
               if (err){
                  reject({error:404, message:"User not found"});
                }
               User.update({'_id':id},data,{}, function (err, numAffected) {
                   if (err){
                      reject(err.message);
                    }

                    resolve(numAffected);
                });
            });
         });
      },
      remove: function(id){
        return new Promise(function(resolve, reject) {

          User.remove({'_id':id}, function (err) {
             if (err){
                reject(err.message);
              }
              resolve("removed");
          });
        });

      },
      findAll: function(){
        return new Promise(function(resolve, reject) {
          User.find({}, function(err, users) {
            let userMap = {};
            users.forEach(function(user) {
              userMap[user._id] = user;
            });

            resolve(userMap);
          });
        });
      },
      create: function(params){
        return new Promise(function(resolve, reject) {

          let user = new User(params);
          user.password = user.generateHash(user.password);
          user.save(function (err) {
            if (err){
              reject(err.message);
            }
             resolve(user._id);
          });
        });
      }
    }
  }
}


