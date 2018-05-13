//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Servicio = require('../models/servicio');
const fs = require("fs");

exports.findDocuments = (req, res) => {

    Servicio.forge().fetchAll()
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

        id_tipo_servicio: req.body.id_tipo_servicio,
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        duracion: req.body.duracion,
        estatus: req.body.estatus,
        fecha_creacion: req.body.fecha_creacion,
        visible: req.body.visible,
    }

    Servicio.forge(newData).save()
        .then(function(data) {
            // ----- Guardar Imagen -----
            if (req.files.archivo) fs.rename(req.files.archivo.path, "files/servicio/" + data.id + "." + extension);


            res.status(200).json({ error: false, data: { message: 'servicio creado' } });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.findOneDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Servicio.forge(conditions).fetch()
        .then(function(data) {
            if (!data) return res.status(404).json({ error: true, data: { message: 'servicio no existe' } });

            res.status(200).json({ error: false, data: data.toJSON() })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}

exports.updateDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Servicio.forge(conditions).fetch()
        .then(function(servicio) {
            if (!servicio) return res.status(404).json({ error: true, data: { message: 'servicio no existe' } });


            // ----- Extension Imagen -----
            if (req.files.archivo) {
                var extension = req.files.archivo.name.split(".").pop();
            } else {
                var extension = null;
            }

            let updateData = {
                imagen: extension,

                id_tipo_servicio: req.body.id_tipo_servicio,
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                duracion: req.body.duracion,
                estatus: req.body.estatus,
                fecha_creacion: req.body.fecha_creacion,
                visible: req.body.visible,
            }

            servicio.save(updateData)
                .then(function(data) {
                    if (req.files.archivo) fs.rename(req.files.archivo.path, "files/servicio/" + data.id + "." + extension);


                    res.status(200).json({ error: false, data: { message: 'servicio actualizado' } });
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

    Servicio.forge(conditions).fetch()
        .then(function(servicio) {
            if (!servicio) return res.status(404).json({ error: true, data: { message: 'servicio no existe' } });

            servicio.destroy()
                .then(function(data) {
                    res.status(200).json({ error: false, data: { message: 'servicio eliminado' } })
                })
                .catch(function(err) {
                    res.status(500).json({ error: true, data: { message: err.message } });
                })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}