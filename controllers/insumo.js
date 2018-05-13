//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Insumo = require('../models/insumo');

exports.findDocuments = (req,res) => {
  
  Insumo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_tipo_insumo:     req.body.id_tipo_insumo,
    id_unidad:          req.body.id_unidad,
    nombre:             req.body.nombre,
    cantidad:           req.body.cantidad,
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Insumo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'insumo creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Insumo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'insumo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Insumo.forge(conditions).fetch()
    .then(function(insumo){
      if(!insumo) return res.status(404).json({ error : true, data : { message : 'insumo no existe' } });

      let updateData = {
        id_tipo_insumo:     req.body.id_tipo_insumo,
        id_unidad:          req.body.id_unidad,
        nombre:             req.body.nombre,
        cantidad:           req.body.cantidad,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      insumo.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'insumo actualizado'} });
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

  Insumo.forge(conditions).fetch()
    .then(function(insumo){
      if(!insumo) return res.status(404).json({ error : true, data : { message : 'insumo no existe' } });

      insumo.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'insumo eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}