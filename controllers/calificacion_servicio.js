//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Calificacion_servicio = require('../models/calificacion_servicio');

exports.findDocuments = (req,res) => {
  
  Calificacion_servicio.forge().fetchAll()
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
    puntuacion:           req.body.puntuacion,
    fecha_creacion:       req.body.fecha_creacion,
    estatus:              req.body.estatus,
  }

  Calificacion_servicio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'calificacion_servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Calificacion_servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'calificacion_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Calificacion_servicio.forge(conditions).fetch()
    .then(function(calificacion_servicio){
      if(!calificacion_servicio) return res.status(404).json({ error : true, data : { message : 'calificacion_servicio no existe' } });

      let updateData = {
        id_detalle_servicio:  req.body.id_detalle_servicio,
        puntuacion:           req.body.puntuacion,
        fecha_creacion:       req.body.fecha_creacion,
        estatus:              req.body.estatus,
      }
      
      calificacion_servicio.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'calificacion_servicio actualizado'} });
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

  Calificacion_servicio.forge(conditions).fetch()
    .then(function(calificacion_servicio){
      if(!calificacion_servicio) return res.status(404).json({ error : true, data : { message : 'calificacion_servicio no existe' } });

      calificacion_servicio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'calificacion_servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}