//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Contacto_negocio = require('../models/contacto_negocio');

exports.findDocuments = (req,res) => {
  
  Contacto_negocio.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_negocio:       req.body.id_negocio,
    tipo_contacto:    req.body.tipo_contacto,
    id_ciudad:        req.body.id_ciudad,
    descripcion:      req.body.descripcion,
    estatus:          req.body.estatus,
    visible:          req.body.visible,
    fecha_creacion:   req.body.fecha_creacion,
  }

  Contacto_negocio.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'contacto_negocio creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Contacto_negocio.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'contacto_negocio no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Contacto_negocio.forge(conditions).fetch()
    .then(function(contacto_negocio){
      if(!contacto_negocio) return res.status(404).json({ error : true, data : { message : 'contacto_negocio no existe' } });

      let updateData = {
        id_negocio:       req.body.id_negocio,
        tipo_contacto:    req.body.tipo_contacto,
        id_ciudad:        req.body.id_ciudad,
        descripcion:      req.body.descripcion,
        estatus:          req.body.estatus,
        visible:          req.body.visible,
        fecha_creacion:   req.body.fecha_creacion,
      }
      
      contacto_negocio.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'contacto_negocio actualizado'} });
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

  Contacto_negocio.forge(conditions).fetch()
    .then(function(contacto_negocio){
      if(!contacto_negocio) return res.status(404).json({ error : true, data : { message : 'contacto_negocio no existe' } });

      contacto_negocio.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'contacto_negocio eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}