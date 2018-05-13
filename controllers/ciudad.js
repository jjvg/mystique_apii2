//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Ciudad = require('../models/ciudad');

exports.findDocuments = (req,res) => {
  
  Ciudad.forge().fetchAll()
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
    id_estado:          req.body.id_estado,
    estatus:            req.body.estatus,
  }

  Ciudad.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'ciudad creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Ciudad.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'ciudad no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Ciudad.forge(conditions).fetch()
    .then(function(ciudad){
      if(!ciudad) return res.status(404).json({ error : true, data : { message : 'ciudad no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        id_estado:          req.body.id_estado,
        estatus:            req.body.estatus,
      }
      
      ciudad.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'ciudad actualizado'} });
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

  Ciudad.forge(conditions).fetch()
    .then(function(ciudad){
      if(!ciudad) return res.status(404).json({ error : true, data : { message : 'ciudad no existe' } });

      ciudad.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'ciudad eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}