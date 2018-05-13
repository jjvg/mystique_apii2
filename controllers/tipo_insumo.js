//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_insumo = require('../models/tipo_insumo');

exports.findDocuments = (req,res) => {
  
  Tipo_insumo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Tipo_insumo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_insumo creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_insumo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_insumo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_insumo.forge(conditions).fetch()
    .then(function(tipo_insumo){
      if(!tipo_insumo) return res.status(404).json({ error : true, data : { message : 'tipo_insumo no existe' } });

      let updateData = {
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      tipo_insumo.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_insumo actualizado'} });
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

  Tipo_insumo.forge(conditions).fetch()
    .then(function(tipo_insumo){
      if(!tipo_insumo) return res.status(404).json({ error : true, data : { message : 'tipo_insumo no existe' } });

      tipo_insumo.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_insumo eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}