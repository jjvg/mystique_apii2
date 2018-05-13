//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Servicio_solicitado = require('../models/servicio_solicitado');

exports.findDocuments = (req,res) => {
  
  Servicio_solicitado.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_servicio:        req.body.id_servicio,
    id_solicitud:       req.body.id_solicitud,
    estatus:            req.body.estatus,
    fecha_creacion:     req.body.fecha_creacion,
  }

  Servicio_solicitado.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'servicio_solicitado creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Servicio_solicitado.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'servicio_solicitado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Servicio_solicitado.forge(conditions).fetch()
    .then(function(servicio_solicitado){
      if(!servicio_solicitado) return res.status(404).json({ error : true, data : { message : 'servicio_solicitado no existe' } });

      let updateData = {
        id_servicio:        req.body.id_servicio,
        id_solicitud:       req.body.id_solicitud,
        estatus:            req.body.estatus,
        fecha_creacion:     req.body.fecha_creacion,
      }
      
      servicio_solicitado.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'servicio_solicitado actualizado'} });
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

  Servicio_solicitado.forge(conditions).fetch()
    .then(function(servicio_solicitado){
      if(!servicio_solicitado) return res.status(404).json({ error : true, data : { message : 'servicio_solicitado no existe' } });

      servicio_solicitado.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'servicio_solicitado eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}