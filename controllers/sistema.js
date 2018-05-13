//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Sistema = require('../models/sistema');
const fs = require("fs");

exports.findDocuments = (req, res) => {

    Sistema.forge().fetchAll()
        .then(function(data) {
            res.status(200).json({ error: false, data: data.toJSON() });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.createDocument = (req, res) => {


    // ----- Extension Imagen -----
    if (req.files.archivo) {
        var extension = req.files.archivo.name.split(".").pop();
    } else {
        var extension = null;
    }

    let newData = {
        imagen: extension,

        estatus: req.body.estatus,
        nombre: req.body.nombre,
        fecha_creacion: req.body.fecha_creacion,
    }

    Sistema.forge(newData).save()
        .then(function(data) {
            // ----- Guardar Imagen -----
            if (req.files.archivo) fs.rename(req.files.archivo.path, "files/sistema/" + data.id + "." + extension);

            res.status(200).json({ error: false, data: { message: 'sistema creado' } });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.findOneDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Sistema.forge(conditions).fetch()
        .then(function(data) {
            if (!data) return res.status(404).json({ error: true, data: { message: 'sistema no existe' } });

            res.status(200).json({ error: false, data: data.toJSON() })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}

exports.updateDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Sistema.forge(conditions).fetch()
        .then(function(sistema) {
            if (!sistema) return res.status(404).json({ error: true, data: { message: 'sistema no existe' } });

            // ----- Extension Imagen -----
            if (req.files.archivo) {
                var extension = req.files.archivo.name.split(".").pop();
            } else {
                var extension = null;
            }

            let updateData = {
                imagen: extension,
                estatus: req.body.estatus,
                nombre: req.body.nombre,
                fecha_creacion: req.body.fecha_creacion,
            }

            sistema.save(updateData)
                .then(function(data) {
                    // ----- Guardar Imagen -----
                    if (req.files.archivo) fs.rename(req.files.archivo.path, "files/sistema/" + data.id + "." + extension);


                    res.status(200).json({ error: false, data: { message: 'sistema actualizado' } });
                })
                .catch(function(err) {
                    res.status(500).json({ error: false, data: { message: err.message } });
                })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}

exports.deleteDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Sistema.forge(conditions).fetch()
        .then(function(sistema) {
            if (!sistema) return res.status(404).json({ error: true, data: { message: 'sistema no existe' } });

            sistema.destroy()
                .then(function(data) {
                    res.status(200).json({ error: false, data: { message: 'sistema eliminado' } })
                })
                .catch(function(err) {
                    res.status(500).json({ error: true, data: { message: err.message } });
                })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}