//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Valor_parametro = require('../models/valor_parametro');

exports.findDocuments = (req,res) => {
  
  Valor_parametro.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_parametro:     req.body.id_parametro,
    nombre:           req.body.nombre,
    estatus:          req.body.estatus,
    descripcion:      req.body.descripcion,
    fecha_creacion:   req.body.fecha_creacion,
  }

  Valor_parametro.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'valor_parametro creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Valor_parametro.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'valor_parametro no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Valor_parametro.forge(conditions).fetch()
    .then(function(valor_parametro){
      if(!valor_parametro) return res.status(404).json({ error : true, data : { message : 'valor_parametro no existe' } });

      let updateData = {
        id_parametro:     req.body.id_parametro,
        nombre:           req.body.nombre,
        estatus:          req.body.estatus,
        descripcion:      req.body.descripcion,
        fecha_creacion:   req.body.fecha_creacion,
      }
      
      valor_parametro.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'valor_parametro actualizado'} });
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

  Valor_parametro.forge(conditions).fetch()
    .then(function(valor_parametro){
      if(!valor_parametro) return res.status(404).json({ error : true, data : { message : 'valor_parametro no existe' } });

      valor_parametro.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'valor_parametro eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}