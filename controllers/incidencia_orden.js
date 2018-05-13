//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Incidencia_orden = require('../models/incidencia_orden');

exports.findDocuments = (req,res) => {
  
  Incidencia_orden.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_orden_servicio:    req.body.id_orden_servicio,
    id_tipo_incidencia:   req.body.id_tipo_incidencia,
    descripcion:          req.body.descripcion,
    fecha_creacion:       req.body.fecha_creacion,
    estatus:              req.body.estatus,
  }

  Incidencia_orden.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'incidencia_orden creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Incidencia_orden.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'incidencia_orden no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Incidencia_orden.forge(conditions).fetch()
    .then(function(incidencia_orden){
      if(!incidencia_orden) return res.status(404).json({ error : true, data : { message : 'incidencia_orden no existe' } });

      let updateData = {
        id_orden_servicio:    req.body.id_orden_servicio,
        id_tipo_incidencia:   req.body.id_tipo_incidencia,
        descripcion:          req.body.descripcion,
        fecha_creacion:       req.body.fecha_creacion,
        estatus:              req.body.estatus,
      }
      
      incidencia_orden.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'incidencia_orden actualizado'} });
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

  Incidencia_orden.forge(conditions).fetch()
    .then(function(incidencia_orden){
      if(!incidencia_orden) return res.status(404).json({ error : true, data : { message : 'incidencia_orden no existe' } });

      incidencia_orden.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'incidencia_orden eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}