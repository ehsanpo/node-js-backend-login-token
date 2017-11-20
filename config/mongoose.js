var path = require('path');
var pwd = path.normalize(process.cwd());

const {Initializer, api} = require('actionhero')

exports.default = {
  mongoose: (api) => {
    return {
      auto_start: true,
      connection_string: "mongodb://localhost:27017/actionhero",
      debug: true,
      model_path: pwd + '/models'
    }
  }
}


exports.test = { 
  mongoose: (api) =>{
    return {
      auto_start: true,
      connection_string: "mongodb://localhost:27017/actionhero",
      debug: true,
      model_path: pwd + '/models'
    }
  }
}

exports.production = { 
  mongoose: (api) =>{
    return {
      auto_start: true,
      connection_string: "mongodb://localhost:27017/actionhero",
      debug: false,
      model_path: pwd + '/models'
    }
  }
}