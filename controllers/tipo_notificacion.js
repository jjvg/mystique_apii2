//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_notificacion = require('../models/tipo_notificacion');

exports.findDocuments = (req,res) => {
  
  Tipo_notificacion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Tipo_notificacion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_notificacion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_notificacion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_notificacion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_notificacion.forge(conditions).fetch()
    .then(function(tipo_notificacion){
      if(!tipo_notificacion) return res.status(404).json({ error : true, data : { message : 'tipo_notificacion no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      tipo_notificacion.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_notificacion actualizado'} });
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

  Tipo_notificacion.forge(conditions).fetch()
    .then(function(tipo_notificacion){
      if(!tipo_notificacion) return res.status(404).json({ error : true, data : { message : 'tipo_notificacion no existe' } });

      tipo_notificacion.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_notificacion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}