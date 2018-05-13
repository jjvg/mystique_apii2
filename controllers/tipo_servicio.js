//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_servicio = require('../models/tipo_servicio');

exports.findDocuments = (req,res) => {
  
  Tipo_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_categoria_servicio: req.body.id_categoria_servicio,
    nombre:                req.body.nombre,
    descripcion:           req.body.descripcion,
    estatus:               req.body.estatus,
    fecha_creacion:        req.body.fecha_creacion,
  }

  Tipo_servicio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_servicio.forge(conditions).fetch()
    .then(function(tipo_servicio){
      if(!tipo_servicio) return res.status(404).json({ error : true, data : { message : 'tipo_servicio no existe' } });

      let updateData = {
        id_categoria_servicio: req.body.id_categoria_servicio,
        nombre:                req.body.nombre,
        descripcion:           req.body.descripcion,
        estatus:               req.body.estatus,
        fecha_creacion:        req.body.fecha_creacion,
      }
      
      tipo_servicio.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_servicio actualizado'} });
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

  Tipo_servicio.forge(conditions).fetch()
    .then(function(tipo_servicio){
      if(!tipo_servicio) return res.status(404).json({ error : true, data : { message : 'tipo_servicio no existe' } });

      tipo_servicio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}