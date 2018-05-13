'use strict' //de uso estricto para el servidor
const vista_respuesta_solicitud = require('../models/vista_respuesta_solicitud');

//next para encadenar a otra funcion
function findFRespuestaSolicitud (req,res, next) {
  
  vista_respuesta_solicitud.forge().fetchAll()
  .then(function(data){
  	 if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });
    res.status(200).json({ error : false, data : data });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

function findOneRespuestaSolicitud (req,res) {

  let conditions = { id: req.params.id };

  vista_respuesta_solicitud.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

module.exports= { 
   findFRespuestaSolicitud,
   findOneRespuestaSolicitud  
}
