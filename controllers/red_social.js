//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Red_social = require('../models/red_social');

exports.findDocuments = (req,res) => {
  
  Red_social.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_negocio:         req.body.id_negocio,
    nombre:    		      req.body.nombre,
    url: 	              req.body.url,
    estatus:            req.body.estatus,
    fecha_creacion:     req.body.fecha_creacion,
    visible:            req.body.visible,
  }

  Red_social.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'red_social creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Red_social.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'red_social no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Red_social.forge(conditions).fetch()
    .then(function(red_social){
      if(!red_social) return res.status(404).json({ error : true, data : { message : 'red_social no existe' } });

      let updateData = {
        id_negocio:         req.body.id_negocio,
        nombre:             req.body.nombre,
        url:                req.body.url,
        estatus:            req.body.estatus,
        fecha_creacion:     req.body.fecha_creacion,
        visible:            req.body.visible,
      }
      
      red_social.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'red_social actualizado'} });
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

  Red_social.forge(conditions).fetch()
    .then(function(red_social){
      if(!red_social) return res.status(404).json({ error : true, data : { message : 'red_social no existe' } });

      red_social.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'red_social eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}