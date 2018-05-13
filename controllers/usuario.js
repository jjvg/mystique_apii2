//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Usuario = require('../models/usuario');

exports.findDocuments = (req,res) => {
  
  Usuario.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  //encriptado de contraseña
  let salt = bcrypt.genSaltSync(12);
  let hash = bcrypt.hashSync(req.body.contrasenia, salt);

  let newData = {
    id_rol:         req.body.id_rol,
    correo:         req.body.correo,
    contrasenia:    hash,
    ultimo_acceso:  req.body.ultimo_acceso,
    fecha_creacion: req.body.fecha_creacion,
    estatus:        req.body.estatus,
  }

  Usuario.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'usuario creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Usuario.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'usuario no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Usuario.forge(conditions).fetch()
    .then(function(usuario){
      if(!usuario) return res.status(404).json({ error : true, data : { message : 'usuario no existe' } });

      //encriptado de contraseña
      let salt = bcrypt.genSaltSync(12);
      let hash = bcrypt.hashSync(req.body.contrasenia, salt);

      let updateData = {
        id_rol:         req.body.id_rol,
        correo:         req.body.correo,
        contrasenia:    hash,
        ultimo_acceso:  req.body.ultimo_acceso,
        fecha_creacion: req.body.fecha_creacion,
        estatus:        req.body.estatus,
      }
      
      usuario.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'usuario actualizado'} });
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

  Usuario.forge(conditions).fetch()
    .then(function(usuario){
      if(!usuario) return res.status(404).json({ error : true, data : { message : 'usuario no existe' } });

      usuario.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'usuario eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}