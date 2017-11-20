'use strict'

const {Action, api} = require('actionhero')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const url = 'mongodb://localhost:27017/actionhero'

module.exports = class Random extends Action {
  constructor () {
    super()
    this.name = 'random'
    this.description = 'I will create a chatroom with the given name'
  }

  run ({response}) {





// Connection URL


// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {

// if (err) throw err;
  
//   db.collection("inventory'").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });


// });


  var results_from_mongo = [];

  MongoClient.connect(url, function (err, db) {
    //var str = db.collection('qmquestions').find();
    var str = db.collection('inventory').find({}).toArray(function (err, docs){
      if(err){
         console.log('error')
      }
      console.log(docs)
      //return res.render('test', {results_from_mongo : results_from_mongo });
      console.log('test', {results_from_mongo : docs });
    })// callback
    //str.each(function (err, doc) {
    //  //console.log(doc);
    //  results_from_mongo.push(doc);
    //  console.log(results_from_mongo) //Push result onto results_array
    //});

    //now we have a results array filled like this:
    // results_from_mongo = ["some string", "some string", "some string"]
    //so let's pass them to the jade file to render them.
  });






    response.random = Math.random() * 10;
  }
}
