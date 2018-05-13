//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Garantia = require('../models/garantia');

exports.findDocuments = (req,res) => {
  
  Garantia.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    cantidad_dias:      req.body.cantidad_dias,
    descripcion:        req.body.descripcion,
    id_servicio:        req.body.id_servicio,
    estatus:            req.body.estatus,
    fecha_creacion:     req.body.fecha_creacion,
  }

  Garantia.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'garantia creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Garantia.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'garantia no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Garantia.forge(conditions).fetch()
    .then(function(garantia){
      if(!garantia) return res.status(404).json({ error : true, data : { message : 'garantia no existe' } });

      let updateData = {
        cantidad_dias:      req.body.cantidad_dias,
        descripcion:        req.body.descripcion,
        id_servicio:        req.body.id_servicio,
        estatus:            req.body.estatus,
        fecha_creacion:     req.body.fecha_creacion,
      }
      
      garantia.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'garantia actualizado'} });
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

  Garantia.forge(conditions).fetch()
    .then(function(garantia){
      if(!garantia) return res.status(404).json({ error : true, data : { message : 'garantia no existe' } });

      garantia.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'garantia eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}