//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Dia_laborable = require('../models/dia_laborable');

exports.findDocuments = (req,res) => {
  
  Dia_laborable.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Dia_laborable.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'dia_laborable creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Dia_laborable.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'dia_laborable no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Dia_laborable.forge(conditions).fetch()
    .then(function(dia_laborable){
      if(!dia_laborable) return res.status(404).json({ error : true, data : { message : 'dia_laborable no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      dia_laborable.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'dia_laborable actualizado'} });
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

  Dia_laborable.forge(conditions).fetch()
    .then(function(dia_laborable){
      if(!dia_laborable) return res.status(404).json({ error : true, data : { message : 'dia_laborable no existe' } });

      dia_laborable.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'dia_laborable eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}