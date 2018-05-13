'use strict' //de uso estricto para el servidor
//const bcrypt = require("bcryptjs"); se usa para encriptar contraseña, aqui no es necesario 
const vista_respuesta_presupuesto = require('../models/vista_respuesta_presupuesto');

//next para encdenar a otra funcion
function findRespuestaPresupuestos (req,res, next){
  
  vista_respuesta_presupuesto.forge().fetchAll()
  .then(function(data){
  	 if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });
    res.status(200).json({ error : false, data : data });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

function findOneRespuestaPresupuesto (req,res) {

  let conditions = { id: req.params.id };

  vista_respuesta_presupuesto.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

module.exports = {
  findRespuestaPresupuestos,
  findOneRespuestaPresupuesto
}