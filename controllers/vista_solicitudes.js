'use strict' //de uso estricto para el servidor
//const bcrypt = require("bcryptjs"); se usa para encriptar contraseña, aqui no es necesario 
const vista_solicitudes = require('../models/vista_solicitudes');

//next para encdenar a otra funcion
exports.findSolicitudes = (req,res, next) => {
  
  vista_solicitudes.fetchAll({
    withRelated: ['vista_servicio_solicitado']
  })
  .then(function(data){
  	 if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });
    res.status(200).json({ error : false, data : data });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneSolicitud = (req,res) => {

  let conditions = { id: req.params.id };

  vista_solicitudes.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}
