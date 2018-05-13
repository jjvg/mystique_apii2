//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Respuesta_comentario = require('../models/respuesta_comentario');

exports.findDocuments = (req,res) => {
  
  Respuesta_comentario.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_tipo_respuesta_comentario:   req.body.id_tipo_respuesta_comentario,
    id_comentario:                  req.body.id_comentario,
    descripcion:                    req.body.descripcion,
    estatus:                        req.body.estatus,
    fecha_creacion:                 req.body.fecha_creacion,
  }

  Respuesta_comentario.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'respuesta_comentario creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Respuesta_comentario.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'respuesta_comentario no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Respuesta_comentario.forge(conditions).fetch()
    .then(function(respuesta_comentario){
      if(!respuesta_comentario) return res.status(404).json({ error : true, data : { message : 'respuesta_comentario no existe' } });

      let updateData = {
        id_tipo_respuesta_comentario:   req.body.id_tipo_respuesta_comentario,
        id_comentario:                  req.body.id_comentario,
        descripcion:                    req.body.descripcion,
        estatus:                        req.body.estatus,
        fecha_creacion:                 req.body.fecha_creacion,
      }
      
      respuesta_comentario.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'respuesta_comentario actualizado'} });
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

  Respuesta_comentario.forge(conditions).fetch()
    .then(function(respuesta_comentario){
      if(!respuesta_comentario) return res.status(404).json({ error : true, data : { message : 'respuesta_comentario no existe' } });

      respuesta_comentario.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'respuesta_comentario eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}