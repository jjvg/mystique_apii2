//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_respuesta_comentario = require('../models/tipo_respuesta_comentario');

exports.findDocuments = (req,res) => {
  
  Tipo_respuesta_comentario.forge().fetchAll()
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
    estatus:            req.body.estatus,
    fecha_creacion:     req.body.fecha_creacion,
  }

  Tipo_respuesta_comentario.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_respuesta_comentario creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_respuesta_comentario.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_respuesta_comentario no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_respuesta_comentario.forge(conditions).fetch()
    .then(function(tipo_respuesta_comentario){
      if(!tipo_respuesta_comentario) return res.status(404).json({ error : true, data : { message : 'tipo_respuesta_comentario no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        estatus:            req.body.estatus,
        fecha_creacion:     req.body.fecha_creacion,
      }
      
      tipo_respuesta_comentario.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_respuesta_comentario actualizado'} });
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

  Tipo_respuesta_comentario.forge(conditions).fetch()
    .then(function(tipo_respuesta_comentario){
      if(!tipo_respuesta_comentario) return res.status(404).json({ error : true, data : { message : 'tipo_respuesta_comentario no existe' } });

      tipo_respuesta_comentario.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_respuesta_comentario eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}