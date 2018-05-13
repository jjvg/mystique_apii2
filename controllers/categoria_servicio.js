//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Categoria_servicio = require('../models/categoria_servicio');

exports.findDocuments = (req,res) => {
  
  Categoria_servicio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:             req.body.nombre,
    estatus:            req.body.estatus,
    fecha_creacion:     req.body.fecha_creacion,
  }

  Categoria_servicio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'categoria_servicio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Categoria_servicio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'categoria_servicio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Categoria_servicio.forge(conditions).fetch()
    .then(function(categoria_servicio){
      if(!categoria_servicio) return res.status(404).json({ error : true, data : { message : 'categoria_servicio no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        estatus:            req.body.estatus,
        fecha_creacion:     req.body.fecha_creacion,
      }
      
      categoria_servicio.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'categoria_servicio actualizado'} });
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

  Categoria_servicio.forge(conditions).fetch()
    .then(function(categoria_servicio){
      if(!categoria_servicio) return res.status(404).json({ error : true, data : { message : 'categoria_servicio no existe' } });

      categoria_servicio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'categoria_servicio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}