//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Respuesta_solicitud = require('../models/respuesta_solicitud');

exports.findDocuments = (req,res) => {
  
  Respuesta_solicitud.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_solicitud:                 req.body.id_solicitud,
    id_tipo_respuesta_solicitud:  req.body.id_tipo_respuesta_solicitud,
    descripcion:                  req.body.descripcion,
    estatus:                      req.body.estatus,
    fecha_creacion:               req.body.fecha_creacion,
  }

  Respuesta_solicitud.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'respuesta_solicitud creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Respuesta_solicitud.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'respuesta_solicitud no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Respuesta_solicitud.forge(conditions).fetch()
    .then(function(respuesta_solicitud){
      if(!respuesta_solicitud) return res.status(404).json({ error : true, data : { message : 'respuesta_solicitud no existe' } });

      let updateData = {
        id_solicitud:                 req.body.id_solicitud,
        id_tipo_respuesta_solicitud:  req.body.id_tipo_respuesta_solicitud,
        descripcion:                  req.body.descripcion,
        estatus:                      req.body.estatus,
        fecha_creacion:               req.body.fecha_creacion,
      }
      
      respuesta_solicitud.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'respuesta_solicitud actualizado'} });
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

  Respuesta_solicitud.forge(conditions).fetch()
    .then(function(respuesta_solicitud){
      if(!respuesta_solicitud) return res.status(404).json({ error : true, data : { message : 'respuesta_solicitud no existe' } });

      respuesta_solicitud.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'respuesta_solicitud eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}