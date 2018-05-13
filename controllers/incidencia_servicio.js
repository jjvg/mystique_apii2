//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Incidencia_servicio = require('../models/incidencia_servicio');

exports.findDocuments = (req,res) => {
  
  Incidencia_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_detalle_servicio:  req.body.id_detalle_servicio,
    id_tipo_incidencia:   req.body.id_tipo_incidencia,
    descripcion:          req.body.descripcion,
    fecha_creacion:       req.body.fecha_creacion,
    estatus:              req.body.estatus,
  }

  Incidencia_servicio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'incidencia_servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Incidencia_servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'incidencia_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Incidencia_servicio.forge(conditions).fetch()
    .then(function(incidencia_servicio){
      if(!incidencia_servicio) return res.status(404).json({ error : true, data : { message : 'incidencia_servicio no existe' } });

      let updateData = {
        id_detalle_servicio:  req.body.id_detalle_servicio,
        id_tipo_incidencia:   req.body.id_tipo_incidencia,
        descripcion:          req.body.descripcion,
        fecha_creacion:       req.body.fecha_creacion,
        estatus:              req.body.estatus,
      }
      
      incidencia_servicio.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'incidencia_servicio actualizado'} });
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

  Incidencia_servicio.forge(conditions).fetch()
    .then(function(incidencia_servicio){
      if(!incidencia_servicio) return res.status(404).json({ error : true, data : { message : 'incidencia_servicio no existe' } });

      incidencia_servicio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'incidencia_servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}