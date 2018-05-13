//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Negocio = require('../models/negocio');
const fs = require("fs");

exports.findDocuments = (req, res) => {

    Negocio.forge().fetchAll()
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
        rif: req.body.rif,
        nombre: req.body.nombre,
        hora_inicio_trabajo: req.body.hora_inicio_trabajo,
        hora_fin_trabajo: req.body.hora_fin_trabajo,
        imagen: extension,
        estatus: req.body.estatus,
        id_sistema: req.body.id_sistema,
        fecha_creacion: req.body.fecha_creacion,
    }

    Negocio.forge(newData).save()
        .then(function(data) {
            // ----- Guardar Imagen -----
            if (req.files.archivo) fs.rename(req.files.archivo.path, "files/negocio/" + data.id + "." + extension);

            res.status(200).json({ error: false, data: { message: 'negocio creado' } });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.findOneDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Negocio.forge(conditions).fetch()
        .then(function(data) {
            if (!data) return res.status(404).json({ error: true, data: { message: 'negocio no existe' } });

            res.status(200).json({ error: false, data: data.toJSON() })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}

exports.updateDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Negocio.forge(conditions).fetch()
        .then(function(negocio) {
            if (!negocio) return res.status(404).json({ error: true, data: { message: 'negocio no existe' } });

            // ----- Extension Imagen -----
            if (req.files.archivo) {
                var extension = req.files.archivo.name.split(".").pop();
            } else {
                var extension = null;
            }

            let updateData = {
                rif: req.body.rif,
                nombre: req.body.nombre,
                hora_inicio_trabajo: req.body.hora_inicio_trabajo,
                hora_fin_trabajo: req.body.hora_fin_trabajo,
                imagen: extension,
                estatus: req.body.estatus,
                id_sistema: req.body.id_sistema,
                fecha_creacion: req.body.fecha_creacion,
            }


            negocio.save(updateData)
                .then(function(data) {
                    // ----- Guardar Imagen -----
                    if (req.files.archivo) fs.rename(req.files.archivo.path, "files/negocio/" + data.id + "." + extension);

                    res.status(200).json({ error: false, data: { message: 'negocio actualizado' } });
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

    Negocio.forge(conditions).fetch()
        .then(function(negocio) {
            if (!negocio) return res.status(404).json({ error: true, data: { message: 'negocio no existe' } });

            negocio.destroy()
                .then(function(data) {
                    res.status(200).json({ error: false, data: { message: 'negocio eliminado' } })
                })
                .catch(function(err) {
                    res.status(500).json({ error: true, data: { message: err.message } });
                })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}