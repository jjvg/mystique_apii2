//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Funcion = require('../models/funcion');

exports.findDocuments = (req,res) => {
  
  Funcion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:         req.body.nombre,
    estatus:        req.body.estatus,
    id_funcion:     req.body.id_funcion,
    fecha_creacion: req.body.fecha_creacion,
  }

  Funcion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'funcion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Funcion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'funcion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Funcion.forge(conditions).fetch()
    .then(function(funcion){
      if(!funcion) return res.status(404).json({ error : true, data : { message : 'funcion no existe' } });

      let updateData = {
        nombre:         req.body.nombre,
        estatus:        req.body.estatus,
        id_funcion:     req.body.id_funcion,
        fecha_creacion: req.body.fecha_creacion,
      }
      
      funcion.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'funcion actualizado'} });
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

  Funcion.forge(conditions).fetch()
    .then(function(funcion){
      if(!funcion) return res.status(404).json({ error : true, data : { message : 'funcion no existe' } });

      funcion.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'funcion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}