//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Tipo_parametro = require('../models/tipo_parametro');

exports.findDocuments = (req,res) => {
  
  Tipo_parametro.forge().fetchAll()
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
    apellido:           req.body.apellido,
    cedula:             req.body.cedula,
    telefono:           req.body.telefono,
    direccion:          req.body.direccion,
    id_ciudad:          req.body.id_ciudad,
    fecha_nacimiento:   req.body.fecha_nacimiento,
    tipo_cliente:       req.body.tipo_cliente,
    estatus:            req.body.estatus,
    id_usuario:         req.body.id_usuario,
  }

  Tipo_parametro.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'tipo_parametro creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_parametro.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'tipo_parametro no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Tipo_parametro.forge(conditions).fetch()
    .then(function(tipo_parametro){
      if(!tipo_parametro) return res.status(404).json({ error : true, data : { message : 'tipo_parametro no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        apellido:           req.body.apellido,
        cedula:             req.body.cedula,
        telefono:           req.body.telefono,
        direccion:          req.body.direccion,
        id_ciudad:          req.body.id_ciudad,
        fecha_nacimiento:   req.body.fecha_nacimiento,
        tipo_cliente:       req.body.tipo_cliente,
        estatus:            req.body.estatus,
        id_usuario:         req.body.id_usuario,
      }
      
      tipo_parametro.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'tipo_parametro actualizado'} });
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

  Tipo_parametro.forge(conditions).fetch()
    .then(function(tipo_parametro){
      if(!tipo_parametro) return res.status(404).json({ error : true, data : { message : 'tipo_parametro no existe' } });

      tipo_parametro.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'tipo_parametro eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}