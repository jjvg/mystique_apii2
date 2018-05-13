//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reclamo = require('../models/reclamo');

exports.findDocuments = (req,res) => {
  
  Reclamo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_detalle_servicio:    req.body.id_detalle_servicio,
    id_tipo_reclamo:        req.body.id_tipo_reclamo,
    descripcion:            req.body.descripcion,
    fecha_creacion:         req.body.fecha_creacion,
    estatus:                req.body.estatus,
  }

  Reclamo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'reclamo creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Reclamo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'reclamo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Reclamo.forge(conditions).fetch()
    .then(function(reclamo){
      if(!reclamo) return res.status(404).json({ error : true, data : { message : 'reclamo no existe' } });

      let updateData = {
        id_detalle_servicio:    req.body.id_detalle_servicio,
        id_tipo_reclamo:        req.body.id_tipo_reclamo,
        descripcion:            req.body.descripcion,
        fecha_creacion:         req.body.fecha_creacion,
        estatus:                req.body.estatus,
      }
      
      reclamo.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'reclamo actualizado'} });
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

  Reclamo.forge(conditions).fetch()
    .then(function(reclamo){
      if(!reclamo) return res.status(404).json({ error : true, data : { message : 'reclamo no existe' } });

      reclamo.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'reclamo eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}