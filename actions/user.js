'use strict'
const {Action, api} = require('actionhero')

exports.userlogin = class extends Action {
 constructor () {
   super()
   this.name = 'login'
   this.description= 'login'
   this.inputs= {
    required: ["email","password"],
    optional: [],
  }
 }

 async run ({response,connection}) {
    response.user = await api.user.login(connection.params.email,connection.params.password);
 }
}

exports.userGet = class extends Action {
 constructor () {
   super()
   this.name = 'user/get'
   this.description= 'get user by id',
   this.inputs= {
    required: ["token"],
    optional: [],
  }
 }

 async run ({response,connection}) {
  response.user = false;
  const resullt =  await api.jwtauth.processToken(connection.params.token);
    if (resullt ) {
       response.user = await api.user.find(connection.params.id);
  }
 }
}


exports.userList = class  extends Action {
 constructor () {
   super()
   this.name = 'user'
   this.description= 'List all users'
   this.inputs= {
    required: ["token"],
    optional: [],
  }
 }

async run ({response,connection}) {
    response.user = false;
    const resullt =  await api.jwtauth.processToken(connection.params.token);
    if (resullt ) {
       response.user =  await api.user.findAll();
    }
  
 }
}


exports.userCreate = class extends Action {
 constructor () {
   super()
   this.name = 'user/create'
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
  response.user = false;
  const resullt =  await api.jwtauth.processToken(connection.params.token);
  if (resullt ) {
      response.user = await api.user.create( connection.params );
  }else{
    response.user.error = true;
    response.user.massage = 'wrong token';
  }
  
 }
}


exports.userUpdate = class extends Action {
 constructor () {
   super()
   this.name = 'user/update'
   this.description= 'user'
   this.inputs= {
    required: ["id", "token"],
    optional: [],
  }
 }

 async run ({response,connection}) {
  response.user = false;
  const resullt =  await api.jwtauth.processToken(connection.params.token);
  if (resullt ) {
      response.user = await api.user.update(connection.params.id);
  }
   
 }
}
