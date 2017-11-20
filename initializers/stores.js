const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const {Initializer, api} = require('actionhero')

module.exports = class stores extends Initializer {
  constructor () {
    super()
    this.name = 'stores'
    this.loadPriority = 1001
    this.startPriority = 1001
    this.stopPriority = 1001
  }

  async initialize () {
  const Store= api.mongoose.models.stores.model;
  const MainStore= api.mongoose.models.stores.main_model;
    api.store= {

       find: function(id){
        return new Promise(function(resolve, reject) {
          Store.findById(id, function (err, myDocument) {
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
            
            Store.findById(id, function (err, myDocument) {
               if (err){
                  reject({error:404, message:"User not found"});
                }
               Store.update({'_id':id},data,{}, function (err, numAffected) {
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

          Store.remove({'_id':id}, function (err) {
             if (err){
                reject(err.message);
              }
              resolve("removed");
          });
        });

      },
      findAll: function(){
        return new Promise(function(resolve, reject) {
          Store.find({}, function(err, users) {
            let storeMap = {};
            users.forEach(function(store) {
              storeMap[store._id] = store;
            });

            resolve(storeMap);
          });
        });
      },
      create: function(params){
        return new Promise(function(resolve, reject) {

          let store = new Store(params);
          store.save(function (err) {
            if (err){
              reject(err.message);
            }
             resolve(store._id);
          });
        });
      },
      createMain: function(params){
        return new Promise(function(resolve, reject) {

          let store = new MainStore(params);
          store.save(function (err) {
            if (err){
              reject(err.message);
            }
             resolve(store._id);
          });
        });
      }
    }
  }
}


