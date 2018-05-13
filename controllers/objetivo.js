//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Objetivo = require('../models/objetivo');

exports.findDocuments = (req,res) => {
  
  Objetivo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    titulo:             req.body.titulo,
    descripcion:        req.body.descripcion,
    estatus:            req.body.estatus,
    id_negocio:         req.body.id_negocio,
    visible:            req.body.visible,
    fecha_creacion:     req.body.fecha_creacion,
  }

  Objetivo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'objetivo creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Objetivo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'objetivo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Objetivo.forge(conditions).fetch()
    .then(function(objetivo){
      if(!objetivo) return res.status(404).json({ error : true, data : { message : 'objetivo no existe' } });

      let updateData = {
        titulo:             req.body.titulo,
        descripcion:        req.body.descripcion,
        estatus:            req.body.estatus,
        id_negocio:         req.body.id_negocio,
        visible:            req.body.visible,
        fecha_creacion:     req.body.fecha_creacion,
      }
      
      objetivo.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'objetivo actualizado'} });
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

  Objetivo.forge(conditions).fetch()
    .then(function(objetivo){
      if(!objetivo) return res.status(404).json({ error : true, data : { message : 'objetivo no existe' } });

      objetivo.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'objetivo eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}