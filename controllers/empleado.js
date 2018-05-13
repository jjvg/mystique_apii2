//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Empleado = require('../models/empleado');
const fs = require("fs");

exports.findDocuments = (req, res) => {

    Empleado.forge().fetchAll()
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
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        fecha_nacimiento: req.body.fecha_nacimiento,
        fecha_creacion: req.body.fecha_creacion,
        estatus: req.body.estatus,
        id_ciudad: req.body.id_ciudad,
        id_usuario: req.body.id_usuario,
        imagen: extension,
    }

    Empleado.forge(newData).save()
        .then(function(data) {
            // ----- Guardar Imagen -----
            if (req.files.archivo) fs.rename(req.files.archivo.path, "files/empleado/" + data.id + "." + extension);

            res.status(200).json({ error: false, data: { message: 'empleado creado' } });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.findOneDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Empleado.forge(conditions).fetch()
        .then(function(data) {
            if (!data) return res.status(404).json({ error: true, data: { message: 'empleado no existe' } });

            res.status(200).json({ error: false, data: data.toJSON() })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}

exports.updateDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Empleado.forge(conditions).fetch()
        .then(function(empleado) {
            if (!empleado) return res.status(404).json({ error: true, data: { message: 'empleado no existe' } });

            // ----- Extension Imagen -----
            if (req.files.archivo) {
                var extension = req.files.archivo.name.split(".").pop();
            } else {
                var extension = null;
            }

            let updateData = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                cedula: req.body.cedula,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                fecha_nacimiento: req.body.fecha_nacimiento,
                fecha_creacion: req.body.fecha_creacion,
                estatus: req.body.estatus,
                id_ciudad: req.body.id_ciudad,
                id_usuario: req.body.id_usuario,
                imagen: extension,
            }

            empleado.save(updateData)
                .then(function(data) {
                    // ----- Guardar Imagen -----
                    if (req.files.archivo) fs.rename(req.files.archivo.path, "files/empleado/" + data.id + "." + extension);

                    res.status(200).json({ error: false, data: { message: 'empleado actualizado' } });
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

    Empleado.forge(conditions).fetch()
        .then(function(empleado) {
            if (!empleado) return res.status(404).json({ error: true, data: { message: 'empleado no existe' } });

            empleado.destroy()
                .then(function(data) {
                    res.status(200).json({ error: false, data: { message: 'empleado eliminado' } })
                })
                .catch(function(err) {
                    res.status(500).json({ error: true, data: { message: err.message } });
                })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}