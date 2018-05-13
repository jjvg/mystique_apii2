//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Unidad = require('../models/unidad');

exports.findDocuments = (req,res) => {
  
  Unidad.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    fecha_creacion:   req.body.fecha_creacion,
    estatus:          req.body.estatus,
    nombre:           req.body.nombre,
  }

  Unidad.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'unidad creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Unidad.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'unidad no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Unidad.forge(conditions).fetch()
    .then(function(unidad){
      if(!unidad) return res.status(404).json({ error : true, data : { message : 'unidad no existe' } });

      let updateData = {
        fecha_creacion:   req.body.fecha_creacion,
        estatus:          req.body.estatus,
        nombre:           req.body.nombre,
      }
      
      unidad.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'unidad actualizado'} });
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

  Unidad.forge(conditions).fetch()
    .then(function(unidad){
      if(!unidad) return res.status(404).json({ error : true, data : { message : 'unidad no existe' } });

      unidad.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'unidad eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}