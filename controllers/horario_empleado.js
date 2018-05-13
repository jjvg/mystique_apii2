//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Horario_empleado = require('../models/horario_empleado');

exports.findDocuments = (req,res) => {
  
  Horario_empleado.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_horario:            req.body.id_horario,
    id_empleado:           req.body.id_empleado,
    id_agenda:             req.body.id_agenda,
    fecha_creacion:        req.body.fecha_creacion,
    estatus:               req.body.estatus,
  }

  Horario_empleado.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'horario_empleado creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Horario_empleado.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'horario_empleado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Horario_empleado.forge(conditions).fetch()
    .then(function(horario_empleado){
      if(!horario_empleado) return res.status(404).json({ error : true, data : { message : 'horario_empleado no existe' } });

      let updateData = {
        id_horario:            req.body.id_horario,
        id_empleado:           req.body.id_empleado,
        id_agenda:             req.body.id_agenda,
        fecha_creacion:        req.body.fecha_creacion,
        estatus:               req.body.estatus,
      }
      
      horario_empleado.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'horario_empleado actualizado'} });
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

  Horario_empleado.forge(conditions).fetch()
    .then(function(horario_empleado){
      if(!horario_empleado) return res.status(404).json({ error : true, data : { message : 'horario_empleado no existe' } });

      horario_empleado.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'horario_empleado eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}