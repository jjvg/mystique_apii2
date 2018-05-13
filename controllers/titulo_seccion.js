//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Titulo_seccion = require('../models/titulo_seccion');

exports.findDocuments = (req,res) => {
  
  Titulo_seccion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_sistema:     req.body.id_sistema,
    boton:          req.body.boton,
    titulo:         req.body.titulo,
    tipo_seccion:   req.body.tipo_seccion,
    descripcion:    req.body.descripcion,
    estatus:        req.body.estatus,
    fecha_creacion: req.body.fecha_creacion,
    visible:        req.body.visible,
  }

  Titulo_seccion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'titulo_seccion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Titulo_seccion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'titulo_seccion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Titulo_seccion.forge(conditions).fetch()
    .then(function(titulo_seccion){
      if(!titulo_seccion) return res.status(404).json({ error : true, data : { message : 'titulo_seccion no existe' } });

      let updateData = {
        id_sistema:     req.body.id_sistema,
        boton:          req.body.boton,
        titulo:         req.body.titulo,
        tipo_seccion:   req.body.tipo_seccion,
        descripcion:    req.body.descripcion,
        estatus:        req.body.estatus,
        fecha_creacion: req.body.fecha_creacion,
        visible:        req.body.visible,
      }
      
      titulo_seccion.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'titulo_seccion actualizado'} });
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

  Titulo_seccion.forge(conditions).fetch()
    .then(function(titulo_seccion){
      if(!titulo_seccion) return res.status(404).json({ error : true, data : { message : 'titulo_seccion no existe' } });

      titulo_seccion.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'titulo_seccion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}