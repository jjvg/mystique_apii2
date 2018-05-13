//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Imagen = require('../models/imagen');
const fs = require("fs");

exports.findDocuments = (req, res) => {

    Imagen.forge().fetchAll()
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
        id_sistema: req.body.id_sistema,
        imagen: extension,
        titulo: req.body.cedula,
        descripcion: req.body.descripcion,
        fecha_creacion: req.body.fecha_creacion,
        estatus: req.body.estatus,
        tipo_imagen: req.body.tipo_imagen,
    }

    Imagen.forge(newData).save()
        .then(function(data) {
            // ----- Guardar Imagen -----
            if (req.files.archivo) fs.rename(req.files.archivo.path, "files/imagen/" + data.id + "." + extension);

            res.status(200).json({ error: false, data: { message: 'imagen creado' } });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.findOneDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Imagen.forge(conditions).fetch()
        .then(function(data) {
            if (!data) return res.status(404).json({ error: true, data: { message: 'imagen no existe' } });

            res.status(200).json({ error: false, data: data.toJSON() })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}

exports.updateDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Imagen.forge(conditions).fetch()
        .then(function(imagen) {
            if (!imagen) return res.status(404).json({ error: true, data: { message: 'imagen no existe' } });

            // ----- Extension Imagen -----
            if (req.files.archivo) {
                var extension = req.files.archivo.name.split(".").pop();
            } else {
                var extension = null;
            }

            let updateData = {
                id_sistema: req.body.id_sistema,
                imagen: extension,
                titulo: req.body.cedula,
                descripcion: req.body.descripcion,
                fecha_creacion: req.body.fecha_creacion,
                estatus: req.body.estatus,
                tipo_imagen: req.body.tipo_imagen,
            }

            imagen.save(updateData)
                .then(function(data) {
                    // ----- Guardar Imagen -----
                    if (req.files.archivo) fs.rename(req.files.archivo.path, "files/imagen/" + data.id + "." + extension);

                    res.status(200).json({ error: false, data: { message: 'imagen actualizado' } });
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

    Imagen.forge(conditions).fetch()
        .then(function(imagen) {
            if (!imagen) return res.status(404).json({ error: true, data: { message: 'imagen no existe' } });

            imagen.destroy()
                .then(function(data) {
                    res.status(200).json({ error: false, data: { message: 'imagen eliminado' } })
                })
                .catch(function(err) {
                    res.status(500).json({ error: true, data: { message: err.message } });
                })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}