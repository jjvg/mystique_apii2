//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Agenda = require('../models/agenda');

exports.findDocuments = (req,res) => {
  
  Agenda.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    fecha_creacion:     req.body.fecha_creacion,
    estatus:            req.body.estatus,
  }

  Agenda.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'agenda creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Agenda.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'agenda no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Agenda.forge(conditions).fetch()
    .then(function(agenda){
      if(!agenda) return res.status(404).json({ error : true, data : { message : 'agenda no existe' } });

      let updateData = {
        fecha_creacion:     req.body.fecha_creacion,
        estatus:            req.body.estatus,
      }
      
      agenda.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'agenda actualizado'} });
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

  Agenda.forge(conditions).fetch()
    .then(function(agenda){
      if(!agenda) return res.status(404).json({ error : true, data : { message : 'agenda no existe' } });

      agenda.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'agenda eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}