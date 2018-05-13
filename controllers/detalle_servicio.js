//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Detalle_servicio = require('../models/detalle_servicio');

exports.findDocuments = (req,res) => {
  
  Detalle_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_orden_servicio:        req.body.id_orden_servicio,
    id_servicio_solicitado:   req.body.id_servicio_solicitado,
    realizacion:              req.body.realizacion,
    fecha_creacion:           req.body.fecha_creacion,
    estatus:                  req.body.estatus,
  }

  Detalle_servicio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'detalle_servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Detalle_servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'detalle_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Detalle_servicio.forge(conditions).fetch()
    .then(function(detalle_servicio){
      if(!detalle_servicio) return res.status(404).json({ error : true, data : { message : 'detalle_servicio no existe' } });

      let updateData = {
        id_orden_servicio:        req.body.id_orden_servicio,
        id_servicio_solicitado:   req.body.id_servicio_solicitado,
        realizacion:              req.body.realizacion,
        fecha_creacion:           req.body.fecha_creacion,
        estatus:                  req.body.estatus,
      }
      
      detalle_servicio.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'detalle_servicio actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Detalle_servicio.forge(conditions).fetch()
    .then(function(detalle_servicio){
      if(!detalle_servicio) return res.status(404).json({ error : true, data : { message : 'detalle_servicio no existe' } });

      detalle_servicio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'detalle_servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}