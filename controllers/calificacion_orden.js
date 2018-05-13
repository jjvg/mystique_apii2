//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Calificacion_orden = require('../models/calificacion_orden');

exports.findDocuments = (req,res) => {
  
  Calificacion_orden.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_criterio:        req.body.id_criterio,
    id_orden_servicio:  req.body.id_orden_servicio,
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Calificacion_orden.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'calificacion_orden creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Calificacion_orden.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'calificacion_orden no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Calificacion_orden.forge(conditions).fetch()
    .then(function(calificacion_orden){
      if(!calificacion_orden) return res.status(404).json({ error : true, data : { message : 'calificacion_orden no existe' } });

      let updateData = {
        id_criterio:        req.body.id_criterio,
        id_orden_servicio:  req.body.id_orden_servicio,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      calificacion_orden.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'calificacion_orden actualizado'} });
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

  Calificacion_orden.forge(conditions).fetch()
    .then(function(calificacion_orden){
      if(!calificacion_orden) return res.status(404).json({ error : true, data : { message : 'calificacion_orden no existe' } });

      calificacion_orden.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'calificacion_orden eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}