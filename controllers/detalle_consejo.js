//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Detalle_consejo = require('../models/detalle_consejo');

exports.findDocuments = (req,res) => {
  
  Detalle_consejo.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_consejo:           req.body.id_consejo,
    id_valor_parametro:   req.body.id_valor_parametro,
    estatus:              req.body.estatus,
    fecha_creacion:       req.body.fecha_creacion,
  }

  Detalle_consejo.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'detalle_consejo creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Detalle_consejo.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'detalle_consejo no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Detalle_consejo.forge(conditions).fetch()
    .then(function(detalle_consejo){
      if(!detalle_consejo) return res.status(404).json({ error : true, data : { message : 'detalle_consejo no existe' } });

      let updateData = {
        id_consejo:           req.body.id_consejo,
        id_valor_parametro:   req.body.id_valor_parametro,
        estatus:              req.body.estatus,
        fecha_creacion:       req.body.fecha_creacion,
      }
      
      detalle_consejo.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'detalle_consejo actualizado'} });
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

  Detalle_consejo.forge(conditions).fetch()
    .then(function(detalle_consejo){
      if(!detalle_consejo) return res.status(404).json({ error : true, data : { message : 'detalle_consejo no existe' } });

      detalle_consejo.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'detalle_consejo eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}