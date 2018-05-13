//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_reclamo = require('../models/tipo_reclamo');

exports.findDocuments = (req,res) => {
  
  Tipo_reclamo.forge().fetchAll()
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

  Tipo_reclamo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_reclamo creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_reclamo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_reclamo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_reclamo.forge(conditions).fetch()
    .then(function(tipo_reclamo){
      if(!tipo_reclamo) return res.status(404).json({ error : true, data : { message : 'tipo_reclamo no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      tipo_reclamo.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_reclamo actualizado'} });
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

  Tipo_reclamo.forge(conditions).fetch()
    .then(function(tipo_reclamo){
      if(!tipo_reclamo) return res.status(404).json({ error : true, data : { message : 'tipo_reclamo no existe' } });

      tipo_reclamo.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_reclamo eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}