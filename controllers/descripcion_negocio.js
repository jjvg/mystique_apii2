//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Descripcion_negocio = require('../models/descripcion_negocio');

exports.findDocuments = (req,res) => {
  
  Descripcion_negocio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_negocio:         req.body.id_negocio,
    descripcion:        req.body.descripcion,
    titulo:             req.body.titulo,
    tipo_descripcion:   req.body.tipo_descripcion,
    estatus:            req.body.estatus,
    fecha_creacion:     req.body.fecha_creacion,
    visible:            req.body.visible,
  }

  Descripcion_negocio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'descripcion_negocio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Descripcion_negocio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'descripcion_negocio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Descripcion_negocio.forge(conditions).fetch()
    .then(function(descripcion_negocio){
      if(!descripcion_negocio) return res.status(404).json({ error : true, data : { message : 'descripcion_negocio no existe' } });

      let updateData = {
        id_negocio:         req.body.id_negocio,
        descripcion:        req.body.descripcion,
        titulo:             req.body.titulo,
        tipo_descripcion:   req.body.tipo_descripcion,
        estatus:            req.body.estatus,
        fecha_creacion:     req.body.fecha_creacion,
        visible:            req.body.visible,
      }
      
      descripcion_negocio.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'descripcion_negocio actualizado'} });
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

  Descripcion_negocio.forge(conditions).fetch()
    .then(function(descripcion_negocio){
      if(!descripcion_negocio) return res.status(404).json({ error : true, data : { message : 'descripcion_negocio no existe' } });

      descripcion_negocio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'descripcion_negocio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}