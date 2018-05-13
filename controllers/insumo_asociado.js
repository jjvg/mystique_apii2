//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Insumo_asociado = require('../models/insumo_asociado');

exports.findDocuments = (req,res) => {
  
  Insumo_asociado.forge().fetchAll()
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
    id_unidad:          req.body.id_unidad,
    id_insumo:          req.body.id_insumo,
    cantidad:           req.body.cantidad,
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Insumo_asociado.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'insumo_asociado creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Insumo_asociado.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'insumo_asociado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Insumo_asociado.forge(conditions).fetch()
    .then(function(insumo_asociado){
      if(!insumo_asociado) return res.status(404).json({ error : true, data : { message : 'insumo_asociado no existe' } });

      let updateData = {
        id_servicio:        req.body.id_servicio,
        id_unidad:          req.body.id_unidad,
        id_insumo:          req.body.id_insumo,
        cantidad:           req.body.cantidad,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      insumo_asociado.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'insumo_asociado actualizado'} });
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

  Insumo_asociado.forge(conditions).fetch()
    .then(function(insumo_asociado){
      if(!insumo_asociado) return res.status(404).json({ error : true, data : { message : 'insumo_asociado no existe' } });

      insumo_asociado.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'insumo_asociado eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}