//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Presupuesto = require('../models/presupuesto');

exports.findDocuments = (req,res) => {
  
  Presupuesto.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_solicitud:       req.body.id_solicitud,
    monto_total:        req.body.monto_total,
    estatus:            req.body.estatus,
    fecha_creacion:     req.body.fecha_creacion,
  }

  Presupuesto.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'presupuesto creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Presupuesto.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'presupuesto no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Presupuesto.forge(conditions).fetch()
    .then(function(presupuesto){
      if(!presupuesto) return res.status(404).json({ error : true, data : { message : 'presupuesto no existe' } });

      let updateData = {
        id_solicitud:       req.body.id_solicitud,
        monto_total:        req.body.monto_total,
        estatus:            req.body.estatus,
        fecha_creacion:     req.body.fecha_creacion,
      }
      
      presupuesto.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'presupuesto actualizado'} });
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

  Presupuesto.forge(conditions).fetch()
    .then(function(presupuesto){
      if(!presupuesto) return res.status(404).json({ error : true, data : { message : 'presupuesto no existe' } });

      presupuesto.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'presupuesto eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}