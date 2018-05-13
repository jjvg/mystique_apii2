//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Parametro = require('../models/parametro');

exports.findDocuments = (req,res) => {
  
  Parametro.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    nombre:         	  req.body.nombre,
    estatus:    		    req.body.estatus,
    id_tipo_parametro: 	req.body.id_tipo_parametro,
  }

  Parametro.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'parametro creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Parametro.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'parametro no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Parametro.forge(conditions).fetch()
    .then(function(parametro){
      if(!parametro) return res.status(404).json({ error : true, data : { message : 'parametro no existe' } });

      let updateData = {
        nombre:             req.body.nombre,
        estatus:            req.body.estatus,
        id_tipo_parametro:  req.body.id_tipo_parametro,
      }
      
      parametro.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'parametro actualizado'} });
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

  Parametro.forge(conditions).fetch()
    .then(function(parametro){
      if(!parametro) return res.status(404).json({ error : true, data : { message : 'parametro no existe' } });

      parametro.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'parametro eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}