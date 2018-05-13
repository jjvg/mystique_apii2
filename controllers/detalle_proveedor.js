//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Detalle_proveedor = require('../models/detalle_proveedor');

exports.findDocuments = (req,res) => {
  
  Detalle_proveedor.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_insumo:          req.body.id_insumo,
    id_proveedor:       req.body.id_proveedor,
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Detalle_proveedor.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'detalle_proveedor creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Detalle_proveedor.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'detalle_proveedor no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Detalle_proveedor.forge(conditions).fetch()
    .then(function(detalle_proveedor){
      if(!detalle_proveedor) return res.status(404).json({ error : true, data : { message : 'detalle_proveedor no existe' } });

      let updateData = {
        id_insumo:          req.body.id_insumo,
        id_proveedor:       req.body.id_proveedor,
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      detalle_proveedor.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'detalle_proveedor actualizado'} });
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

  Detalle_proveedor.forge(conditions).fetch()
    .then(function(detalle_proveedor){
      if(!detalle_proveedor) return res.status(404).json({ error : true, data : { message : 'detalle_proveedor no existe' } });

      detalle_proveedor.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'detalle_proveedor eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}