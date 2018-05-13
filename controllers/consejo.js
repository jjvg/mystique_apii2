//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Consejo = require('../models/consejo');
const fs = require("fs");

exports.findDocuments = (req, res) => {

    Consejo.forge().fetchAll()
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
    };

    let newData = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        imagen: extension,
        autor: req.body.autor,
        fecha_creacion: req.body.fecha_creacion,
        estatus: req.body.estatus,
        id_sistema: req.body.id_sistema,
    }

    Consejo.forge(newData).save()
        .then(function(data) {
            // ----- Guardar Imagen -----
            if (req.files.archivo) fs.rename(req.files.archivo.path, "files/consejo/" + data.id + "." + extension);


            res.status(200).json({ error: false, data: { message: 'consejo creado' } });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.findOneDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Consejo.forge(conditions).fetch()
        .then(function(data) {
            if (!data) return res.status(404).json({ error: true, data: { message: 'consejo no existe' } });

            res.status(200).json({ error: false, data: data.toJSON() })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}

exports.updateDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Consejo.forge(conditions).fetch()
        .then(function(consejo) {
            if (!consejo) return res.status(404).json({ error: true, data: { message: 'consejo no existe' } });

            // ----- Extension Imagen -----
            if (req.files.archivo) {
                var extension = req.files.archivo.name.split(".").pop();
            } else {
                var extension = null;
            }

            let updateData = {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                imagen: extension,
                autor: req.body.autor,
                fecha_creacion: req.body.fecha_creacion,
                estatus: req.body.estatus,
                id_sistema: req.body.id_sistema,
            }

            consejo.save(updateData)
                .then(function(data) {
                    // ----- Guardar Imagen -----
                    if (req.files.archivo) fs.rename(req.files.archivo.path, "files/consejo/" + data.id + "." + extension);


                    res.status(200).json({ error: false, data: { message: 'consejo actualizado' } });
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

    Consejo.forge(conditions).fetch()
        .then(function(consejo) {
            if (!consejo) return res.status(404).json({ error: true, data: { message: 'consejo no existe' } });

            consejo.destroy()
                .then(function(data) {
                    res.status(200).json({ error: false, data: { message: 'consejo eliminado' } })
                })
                .catch(function(err) {
                    res.status(500).json({ error: true, data: { message: err.message } });
                })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}