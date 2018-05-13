//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Comentario = require('../models/comentario');

exports.findDocuments = (req,res) => {
  
  Comentario.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_cliente:           req.body.id_cliente,
    id_tipo_comentario:   req.body.id_tipo_comentario,
    descripcion:          req.body.descripcion,
    estatus:              req.body.estatus,
    fecha_creacion:       req.body.fecha_creacion,
  }

  Comentario.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'comentario creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Comentario.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'comentario no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Comentario.forge(conditions).fetch()
    .then(function(comentario){
      if(!comentario) return res.status(404).json({ error : true, data : { message : 'comentario no existe' } });

      let updateData = {
        id_cliente:           req.body.id_cliente,
        id_tipo_comentario:   req.body.id_tipo_comentario,
        descripcion:          req.body.descripcion,
        estatus:              req.body.estatus,
        fecha_creacion:       req.body.fecha_creacion,
      }
      
      comentario.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'comentario actualizado'} });
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

  Comentario.forge(conditions).fetch()
    .then(function(comentario){
      if(!comentario) return res.status(404).json({ error : true, data : { message : 'comentario no existe' } });

      comentario.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'comentario eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}