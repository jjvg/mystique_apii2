//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Orden_servicio = require('../models/orden_servicio');

exports.findDocuments = (req,res) => {
  
  Orden_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_solicitud:       req.body.id_solicitud,
    id_orden_servicio:  req.body.id_orden_servicio,
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Orden_servicio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'orden_servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Orden_servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'orden_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Orden_servicio.forge(conditions).fetch()
    .then(function(orden_servicio){
      if(!orden_servicio) return res.status(404).json({ error : true, data : { message : 'orden_servicio no existe' } });

      let updateData = {
        id_solicitud:       req.body.id_solicitud,
        id_orden_servicio:  req.body.id_orden_servicio,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      orden_servicio.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'orden_servicio actualizado'} });
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

  Orden_servicio.forge(conditions).fetch()
    .then(function(orden_servicio){
      if(!orden_servicio) return res.status(404).json({ error : true, data : { message : 'orden_servicio no existe' } });

      orden_servicio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'orden_servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}