'use strict' //de uso estricto para el servidor
const vista_servicios_categoria = require('../models/vista_servicios_categoria');

//next para encadenar a otra funcion
function findServiciosCategorias (req,res, next) {
  
  vista_servicios_categoria.forge().fetchAll()
  .then(function(data){
  	 if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });
    res.status(200).json({ error : false, data : data });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

function findOneServicioCategoria (req,res) {

  let conditions = { id: req.params.id };

  vista_servicios_categoria.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

module.exports= { 
   findServiciosCategorias,
   findOneServicioCategoria  
}
