//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Proveedor = require('../models/proveedor');

exports.findDocuments = (req,res) => {
  
  Proveedor.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_ciudad:       req.body.id_ciudad,
    nombre:          req.body.nombre,
    rif:             req.body.rif,
    telefono:        req.body.telefono,
    correo:          req.body.correo,
    direccion:       req.body.direccion,
    fecha_creacion:  req.body.fecha_creacion,
    estatus:         req.body.estatus,
  }

  Proveedor.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'proveedor creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Proveedor.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'proveedor no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Proveedor.forge(conditions).fetch()
    .then(function(proveedor){
      if(!proveedor) return res.status(404).json({ error : true, data : { message : 'proveedor no existe' } });

      let updateData = {
        id_ciudad:       req.body.id_ciudad,
        nombre:          req.body.nombre,
        rif:             req.body.rif,
        telefono:        req.body.telefono,
        correo:          req.body.correo,
        direccion:       req.body.direccion,
        fecha_creacion:  req.body.fecha_creacion,
        estatus:         req.body.estatus,
      }
      
      proveedor.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'proveedor actualizado'} });
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

  Proveedor.forge(conditions).fetch()
    .then(function(proveedor){
      if(!proveedor) return res.status(404).json({ error : true, data : { message : 'proveedor no existe' } });

      proveedor.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'proveedor eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}