//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Insumo_usado = require('../models/insumo_usado');

exports.findDocuments = (req,res) => {
  
  Insumo_usado.forge().fetchAll()
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
    id_unidad:            req.body.id_unidad,
    id_insumo:            req.body.id_insumo,
    cantidad:             req.body.cantidad,
    fecha_creacion:       req.body.fecha_creacion,
    estatus:              req.body.estatus,
  }

  Insumo_usado.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'insumo_usado creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Insumo_usado.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'insumo_usado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Insumo_usado.forge(conditions).fetch()
    .then(function(insumo_usado){
      if(!insumo_usado) return res.status(404).json({ error : true, data : { message : 'insumo_usado no existe' } });

      let updateData = {
        id_detalle_servicio:  req.body.id_detalle_servicio,
        id_unidad:            req.body.id_unidad,
        id_insumo:            req.body.id_insumo,
        cantidad:             req.body.cantidad,
        fecha_creacion:       req.body.fecha_creacion,
        estatus:              req.body.estatus,
      }
      
      insumo_usado.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'insumo_usado actualizado'} });
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

  Insumo_usado.forge(conditions).fetch()
    .then(function(insumo_usado){
      if(!insumo_usado) return res.status(404).json({ error : true, data : { message : 'insumo_usado no existe' } });

      insumo_usado.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'insumo_usado eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}