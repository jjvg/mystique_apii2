//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Categoria_parametro = require('../models/categoria_parametro');

exports.findDocuments = (req,res) => {
  
  Categoria_parametro.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_tipo_parametro:      req.body.id_tipo_parametro,
    id_categoria_servicio:  req.body.id_categoria_servicio,
    estatus:                req.body.estatus,
    fecha_creacion:         req.body.fecha_creacion,
  }

  Categoria_parametro.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'categoria_parametro creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Categoria_parametro.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'categoria_parametro no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Categoria_parametro.forge(conditions).fetch()
    .then(function(categoria_parametro){
      if(!categoria_parametro) return res.status(404).json({ error : true, data : { message : 'categoria_parametro no existe' } });

      let updateData = {
        id_tipo_parametro:      req.body.id_tipo_parametro,
        id_categoria_servicio:  req.body.id_categoria_servicio,
        estatus:                req.body.estatus,
        fecha_creacion:         req.body.fecha_creacion,
      }
      
      categoria_parametro.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'categoria_parametro actualizado'} });
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

  Categoria_parametro.forge(conditions).fetch()
    .then(function(categoria_parametro){
      if(!categoria_parametro) return res.status(404).json({ error : true, data : { message : 'categoria_parametro no existe' } });

      categoria_parametro.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'categoria_parametro eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}