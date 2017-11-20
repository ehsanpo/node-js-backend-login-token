process.env.NODE_ENV = 'test';
var testUrl="http://localhost:18080/api";

var request = require("request");
var should = require('should');
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

describe('tests:users', function(){

  before(function(done){
    actionhero.start(function(err, a){
      api = a;
      done();
    })
  });

  after(function(done){
    actionhero.stop(function(err){
      done();
    });
  })

  
    it("test:succes:get-all-users", function(done){
       
      request.get(testUrl+"/user", {} , function(err, response, body){
        
        result=JSON.parse(body)
        should.exist(result.users);
        done();
       // should.not.exist(body.error);
        
      });
    });

    it("test:error:create-user", function(done){
      user={'username':'test', 'email': 'test','firstname':'test'}

      request.post(testUrl+"/user", user , function(err, response, body){
        
        result=JSON.parse(body)
        should.exist(result.error);
        done();
        
        
      });
    });

});