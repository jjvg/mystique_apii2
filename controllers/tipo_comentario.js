//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_comentario = require('../models/tipo_comentario');

exports.findDocuments = (req,res) => {
  
  Tipo_comentario.forge().fetchAll()
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
    descripcion:        req.body.descripcion,
    estatus:            req.body.estatus,
    fecha_creacion:     req.body.fecha_creacion,
  }

  Tipo_comentario.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_comentario creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_comentario.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_comentario no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_comentario.forge(conditions).fetch()
    .then(function(tipo_comentario){
      if(!tipo_comentario) return res.status(404).json({ error : true, data : { message : 'tipo_comentario no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        descripcion:        req.body.descripcion,
        estatus:            req.body.estatus,
        fecha_creacion:     req.body.fecha_creacion,
      }
      
      tipo_comentario.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_comentario actualizado'} });
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

  Tipo_comentario.forge(conditions).fetch()
    .then(function(tipo_comentario){
      if(!tipo_comentario) return res.status(404).json({ error : true, data : { message : 'tipo_comentario no existe' } });

      tipo_comentario.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_comentario eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}