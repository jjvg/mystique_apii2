//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_incidencia = require('../models/tipo_incidencia');

exports.findDocuments = (req,res) => {
  
  Tipo_incidencia.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_razon_incidencia:  req.body.id_razon_incidencia,
    nombre:               req.body.nombre,
    fecha_creacion:       req.body.fecha_creacion,
    estatus:              req.body.estatus,
  }

  Tipo_incidencia.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_incidencia creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_incidencia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_incidencia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_incidencia.forge(conditions).fetch()
    .then(function(tipo_incidencia){
      if(!tipo_incidencia) return res.status(404).json({ error : true, data : { message : 'tipo_incidencia no existe' } });

      let updateData = {
        id_razon_incidencia:  req.body.id_razon_incidencia,
        nombre:               req.body.nombre,
        fecha_creacion:       req.body.fecha_creacion,
        estatus:              req.body.estatus,
      }
      
      tipo_incidencia.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_incidencia actualizado'} });
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

  Tipo_incidencia.forge(conditions).fetch()
    .then(function(tipo_incidencia){
      if(!tipo_incidencia) return res.status(404).json({ error : true, data : { message : 'tipo_incidencia no existe' } });

      tipo_incidencia.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_incidencia eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}