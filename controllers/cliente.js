//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Cliente = require('../models/cliente');

exports.findDocuments = (req, res) => {

    Cliente.forge().fetchAll()
        .then(function(data) {
            res.status(200).json({ error: false, data: data.toJSON() });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.createDocument = (req, res) => {

    let newData = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        id_ciudad: req.body.id_ciudad,
        fecha_nacimiento: req.body.fecha_nacimiento,
        tipo_cliente: req.body.tipo_cliente,
        estatus: req.body.estatus,
        id_usuario: req.body.id_usuario,
    }

    Cliente.forge(newData).save()
        .then(function(data) {
            res.status(200).json({ error: false, data: { message: 'cliente creado' } });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.findOneDocument = (req, res) => {

    let conditions = { id_usuario: req.params.id };

    Cliente.forge(conditions).fetch({ withRelated: ['solicitudes', 'solicitudes.vista_servicio_solicitado'] })
        .then(function(data) {
            if (!data) return res.status(404).json({ error: true, data: { message: 'cliente no existe' } });

            res.status(200).json({ error: false, data: data.toJSON() })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}

exports.updateDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Cliente.forge(conditions).fetch()
        .then(function(cliente) {
            if (!cliente) return res.status(404).json({ error: true, data: { message: 'cliente no existe' } });

            let updateData = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                cedula: req.body.cedula,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                id_ciudad: req.body.id_ciudad,
                fecha_nacimiento: req.body.fecha_nacimiento,
                tipo_cliente: req.body.tipo_cliente,
                estatus: req.body.estatus,
                id_usuario: req.body.id_usuario,
            }

            cliente.save(updateData)
                .then(function(data) {
                    res.status(200).json({ error: false, data: { message: 'cliente actualizado' } });
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

    Cliente.forge(conditions).fetch()
        .then(function(cliente) {
            if (!cliente) return res.status(404).json({ error: true, data: { message: 'cliente no existe' } });

            cliente.destroy()
                .then(function(data) {
                    res.status(200).json({ error: false, data: { message: 'cliente eliminado' } })
                })
                .catch(function(err) {
                    res.status(500).json({ error: true, data: { message: err.message } });
                })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })
}