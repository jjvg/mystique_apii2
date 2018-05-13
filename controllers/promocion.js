//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Promocion = require('../models/promocion');
const fs = require("fs");

exports.findDocuments = (req, res) => {

    Promocion.forge().fetchAll()
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
        id_servicio: req.body.id_servicio,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        porcentaje_descuento: req.body.porcentaje_descuento,
        precio_promocion: req.body.precio_promocion,
        imagen: extension,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        estatus: req.body.estatus,
        fecha_creacion: req.body.fecha_creacion,
    }

    Promocion.forge(newData).save()
        .then(function(data) {
            // ----- Guardar Imagen -----
            if (req.files.archivo) fs.rename(req.files.archivo.path, "files/promocion/" + data.id + "." + extension);

            res.status(200).json({ error: false, data: { message: 'promocion creado' } });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.findOneDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Promocion.forge(conditions).fetch()
        .then(function(data) {
            if (!data) return res.status(404).json({ error: true, data: { message: 'promocion no existe' } });

            res.status(200).json({ error: false, data: data.toJSON() })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}

exports.updateDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Promocion.forge(conditions).fetch()
        .then(function(promocion) {
            if (!promocion) return res.status(404).json({ error: true, data: { message: 'promocion no existe' } });

            // ----- Extension Imagen -----
            if (req.files.archivo) {
                var extension = req.files.archivo.name.split(".").pop();
            } else {
                var extension = null;
            }

            let updateData = {
                id_servicio: req.body.id_servicio,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                porcentaje_descuento: req.body.porcentaje_descuento,
                precio_promocion: req.body.precio_promocion,
                imagen: extension,
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin: req.body.fecha_fin,
                estatus: req.body.estatus,
                fecha_creacion: req.body.fecha_creacion,
            }

            promocion.save(updateData)
                .then(function(data) {
                    // ----- Guardar Imagen -----
                    if (req.files.archivo) fs.rename(req.files.archivo.path, "files/promocion/" + data.id + "." + extension);

                    res.status(200).json({ error: false, data: { message: 'promocion actualizado' } });
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

    Promocion.forge(conditions).fetch()
        .then(function(promocion) {
            if (!promocion) return res.status(404).json({ error: true, data: { message: 'promocion no existe' } });

            promocion.destroy()
                .then(function(data) {
                    res.status(200).json({ error: false, data: { message: 'promocion eliminado' } })
                })
                .catch(function(err) {
                    res.status(500).json({ error: true, data: { message: err.message } });
                })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}