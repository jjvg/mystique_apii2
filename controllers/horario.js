//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Horario = require('../models/horario');

exports.findDocuments = (req,res) => {
  
  Horario.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_dia_laborable:   req.body.id_dia_laborable,
    id_bloque:          req.body.id_bloque,
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Horario.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'horario creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Horario.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'horario no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Horario.forge(conditions).fetch()
    .then(function(horario){
      if(!horario) return res.status(404).json({ error : true, data : { message : 'horario no existe' } });

      let updateData = {
        id_dia_laborable:   req.body.id_dia_laborable,
        id_bloque:          req.body.id_bloque,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      horario.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'horario actualizado'} });
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

  Horario.forge(conditions).fetch()
    .then(function(horario){
      if(!horario) return res.status(404).json({ error : true, data : { message : 'horario no existe' } });

      horario.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'horario eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}