//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Razon_incidencia = require('../models/razon_incidencia');

exports.findDocuments = (req,res) => {
  
  Razon_incidencia.forge().fetchAll()
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
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Razon_incidencia.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'razon_incidencia creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Razon_incidencia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'razon_incidencia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Razon_incidencia.forge(conditions).fetch()
    .then(function(razon_incidencia){
      if(!razon_incidencia) return res.status(404).json({ error : true, data : { message : 'razon_incidencia no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        descripcion:        req.body.descripcion,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      razon_incidencia.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'razon_incidencia actualizado'} });
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

  Razon_incidencia.forge(conditions).fetch()
    .then(function(razon_incidencia){
      if(!razon_incidencia) return res.status(404).json({ error : true, data : { message : 'razon_incidencia no existe' } });

      razon_incidencia.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'razon_incidencia eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}