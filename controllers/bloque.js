//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Bloque = require('../models/bloque');

exports.findDocuments = (req,res) => {
  
  Bloque.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    hora_inicio:        req.body.hora_inicio,
    hora_fin:           req.body.hora_fin,
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Bloque.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'bloque creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Bloque.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'bloque no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Bloque.forge(conditions).fetch()
    .then(function(bloque){
      if(!bloque) return res.status(404).json({ error : true, data : { message : 'bloque no existe' } });

      let updateData = {
        hora_inicio:        req.body.hora_inicio,
        hora_fin:           req.body.hora_fin,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      bloque.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'bloque actualizado'} });
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

  Bloque.forge(conditions).fetch()
    .then(function(bloque){
      if(!bloque) return res.status(404).json({ error : true, data : { message : 'bloque no existe' } });

      bloque.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'bloque eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}