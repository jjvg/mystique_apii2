//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Criterio = require('../models/criterio');

exports.findDocuments = (req,res) => {
  
  Criterio.forge().fetchAll()
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

  Criterio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'criterio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Criterio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'criterio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Criterio.forge(conditions).fetch()
    .then(function(criterio){
      if(!criterio) return res.status(404).json({ error : true, data : { message : 'criterio no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      criterio.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'criterio actualizado'} });
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

  Criterio.forge(conditions).fetch()
    .then(function(criterio){
      if(!criterio) return res.status(404).json({ error : true, data : { message : 'criterio no existe' } });

      criterio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'criterio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}