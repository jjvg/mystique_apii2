//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Servicio_parametro = require('../models/servicio_parametro');

exports.findDocuments = (req,res) => {
  
  Servicio_parametro.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_servicio:          req.body.id_servicio,
    id_valor_parametro:   req.body.id_valor_parametro,
    estatus:              req.body.estatus,
    fecha_creacion:       req.body.fecha_creacion,
  }

  Servicio_parametro.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'servicio_parametro creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Servicio_parametro.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'servicio_parametro no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Servicio_parametro.forge(conditions).fetch()
    .then(function(servicio_parametro){
      if(!servicio_parametro) return res.status(404).json({ error : true, data : { message : 'servicio_parametro no existe' } });

      let updateData = {
        id_servicio:          req.body.id_servicio,
        id_valor_parametro:   req.body.id_valor_parametro,
        estatus:              req.body.estatus,
        fecha_creacion:       req.body.fecha_creacion,
      }
      
      servicio_parametro.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'servicio_parametro actualizado'} });
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

  Servicio_parametro.forge(conditions).fetch()
    .then(function(servicio_parametro){
      if(!servicio_parametro) return res.status(404).json({ error : true, data : { message : 'servicio_parametro no existe' } });

      servicio_parametro.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'servicio_parametro eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}