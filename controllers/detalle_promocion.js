//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Detalle_promocion = require('../models/detalle_promocion');

exports.findDocuments = (req,res) => {
  
  Detalle_promocion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_promocion:         req.body.id_promocion,
    id_valor_parametro:   req.body.id_valor_parametro,
    estatus:              req.body.estatus,
    fecha_creacion:       req.body.fecha_creacion,
  }

  Detalle_promocion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'detalle_promocion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Detalle_promocion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'detalle_promocion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Detalle_promocion.forge(conditions).fetch()
    .then(function(detalle_promocion){
      if(!detalle_promocion) return res.status(404).json({ error : true, data : { message : 'detalle_promocion no existe' } });

      let updateData = {
        id_promocion:         req.body.id_promocion,
        id_valor_parametro:   req.body.id_valor_parametro,
        estatus:              req.body.estatus,
        fecha_creacion:       req.body.fecha_creacion,
      }
      
      detalle_promocion.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'detalle_promocion actualizado'} });
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

  Detalle_promocion.forge(conditions).fetch()
    .then(function(detalle_promocion){
      if(!detalle_promocion) return res.status(404).json({ error : true, data : { message : 'detalle_promocion no existe' } });

      detalle_promocion.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'detalle_promocion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}