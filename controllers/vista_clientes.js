'use strict' //de uso estricto para el servidor
//const bcrypt = require("bcryptjs"); se usa para encriptar contraseña, aqui no es necesario 
const vista_cliente = require('../models/vista_cliente');

//next para encdenar a otra funcion
exports.findClientes = (req,res, next) => {
  
  vista_cliente.forge().fetchAll()
  .then(function(data){
  	 if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });
    res.status(200).json({ error : false, data : data });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneCliente = (req,res) => {

  let conditions = { id: req.params.id };

  vista_cliente.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}


