'use strict' //de uso estricto para el servidor
const vista_presupuesto = require('../models/vista_presupuesto');

//next para encadenar a otra funcion
function findFPresupuestos (req,res, next) {
  
  vista_presupuesto.forge().fetchAll()
  .then(function(data){
  	 if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });
    res.status(200).json({ error : false, data : data });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

function findOnePresupuesto (req,res) {

  let conditions = { id: req.params.id };

  vista_presupuesto.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'no hay datos...' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

module.exports= { 
   findFPresupuestos,
   findOnePresupuesto  
}
