'use strict'
const {Action, api} = require('actionhero')

exports.storeGet = class extends Action {
 constructor () {
   super()
   this.name = 'store/get'
   this.description= 'get user by id',
   this.inputs= {
    required: ["token"],
    optional: [],
  }
 }

 async run ({response,connection}) {
  response.store = false;
  const resullt =  await api.jwtauth.processToken(connection.params.token);
    if (resullt ) {
       response.store= await api.store.find(connection.params.id);
  }
 }
}


exports.storeList = class  extends Action {
 constructor () {
   super()
   this.name = 'stores'
   this.description= 'List all users'
   this.inputs= {
    required: ["token"],
    optional: [],
  }
 }

async run ({response,connection}) {
    response.store = false;
    const resullt =  await api.jwtauth.processToken(connection.params.token);
    if (resullt ) {
       response.store =  await api.store.findAll();
    }
  
 }
}


exports.storeCreate = class extends Action {
 constructor () {
   super()
   this.name = 'store/create'
   this.description= 'create new user'
   this.inputs= {
    token: {
      required: true,
    },
    required: ["token"],
    optional: [],
  }
 }
 async run ({response,connection}) {
  response.store = false;
  const resullt =  await api.jwtauth.processToken(connection.params.token);
  if (resullt ) {
      response.store = await api.store.create( connection.params );
  }
 }
}


exports.storeUpdate = class extends Action {
 constructor () {
   super()
   this.name = 'store/update'
   this.description= 'user'
   this.inputs= {
    required: ["id", "token"],
    optional: [],
  }
 }

 async run ({response,connection}) {
  response.store = false;
  const resullt =  await api.jwtauth.processToken(connection.params.token);
  if (resullt ) {
      response.store = await api.store.update(connection.params.id);
  }
   
 }
}
exports.storeMainCreate = class extends Action {
 constructor () {
   super()
   this.name = 'mainstore/create'
   this.description= 'create new user'
   this.inputs= {
    token: {
      required: true,
    },
    required: ["token"],
    optional: [],
  }
 }
 async run ({response,connection}) {
  response.store = false;
  const resullt =  await api.jwtauth.processToken(connection.params.token);
  if (resullt ) {
      response.store = await api.store.createMain( connection.params );
  }
 }
}