//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Rol_funcion = require('../models/rol_funcion');

exports.findDocuments = (req,res) => {
  
  Rol_funcion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_rol:             req.body.id_rol,
    id_funcion:         req.body.id_funcion,
    estatus:            req.body.estatus,
    fecha_creacion:     req.body.fecha_creacion,
  }

  Rol_funcion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'rol_funcion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Rol_funcion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'rol_funcion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Rol_funcion.forge(conditions).fetch()
    .then(function(rol_funcion){
      if(!rol_funcion) return res.status(404).json({ error : true, data : { message : 'rol_funcion no existe' } });

      let updateData = {
        id_rol:             req.body.id_rol,
        id_funcion:         req.body.id_funcion,
        estatus:            req.body.estatus,
        fecha_creacion:     req.body.fecha_creacion,
      }
      
      rol_funcion.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'rol_funcion actualizado'} });
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

  Rol_funcion.forge(conditions).fetch()
    .then(function(rol_funcion){
      if(!rol_funcion) return res.status(404).json({ error : true, data : { message : 'rol_funcion no existe' } });

      rol_funcion.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'rol_funcion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}