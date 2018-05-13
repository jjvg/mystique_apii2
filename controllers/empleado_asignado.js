//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Empleado_asignado = require('../models/empleado_asignado');

exports.findDocuments = (req,res) => {
  
  Empleado_asignado.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_orden_servicio:  req.body.id_orden_servicio,
    id_empleado:        req.body.id_empleado,
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Empleado_asignado.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'empleado_asignado creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Empleado_asignado.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'empleado_asignado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Empleado_asignado.forge(conditions).fetch()
    .then(function(empleado_asignado){
      if(!empleado_asignado) return res.status(404).json({ error : true, data : { message : 'empleado_asignado no existe' } });

      let updateData = {
        id_orden_servicio:  req.body.id_orden_servicio,
        id_empleado:        req.body.id_empleado,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      empleado_asignado.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'empleado_asignado actualizado'} });
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

  Empleado_asignado.forge(conditions).fetch()
    .then(function(empleado_asignado){
      if(!empleado_asignado) return res.status(404).json({ error : true, data : { message : 'empleado_asignado no existe' } });

      empleado_asignado.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'empleado_asignado eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}