//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Estado = require('../models/estado');

exports.findDocuments = (req,res) => {
  
  Estado.forge().fetchAll()
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
  }

  Estado.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'estado creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Estado.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'estado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Estado.forge(conditions).fetch()
    .then(function(estado){
      if(!estado) return res.status(404).json({ error : true, data : { message : 'estado no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        estatus:            req.body.estatus,
      }
      
      estado.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'estado actualizado'} });
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

  Estado.forge(conditions).fetch()
    .then(function(estado){
      if(!estado) return res.status(404).json({ error : true, data : { message : 'estado no existe' } });

      estado.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'estado eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}