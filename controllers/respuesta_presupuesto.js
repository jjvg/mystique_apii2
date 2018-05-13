//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Respuesta_presupuesto = require('../models/respuesta_presupuesto');

exports.findDocuments = (req, res) => {

    Respuesta_presupuesto.forge().fetchAll()
        .then(function(data) {
            res.status(200).json({ error: false, data: data.toJSON() });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.createDocument = (req, res) => {

    let newData = {
        id_presupuesto: req.body.id_presupuesto,
        id_tipo_respuesta_presupuesto: req.body.id_tipo_respuesta_presupuesto,
        titulo: req.body.titulo,
        tipo_descripcion: req.body.tipo_descripcion,
        estatus: req.body.estatus,
        fecha_creacion: req.body.fecha_creacion,
        visible: req.body.visible,
    }

    Respuesta_presupuesto.forge(newData).save()
        .then(function(data) {
            res.status(200).json({ error: false, data: { message: 'respuesta_presupuesto creado' } });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.findOneDocument = (req, res) => {

        let conditions = { id: req.params.id };

        Respuesta_presupuesto.forge(conditions).fetch()
            .then(function(data) {
                if (!data) return res.status(404).json({ error: true, data: { message: 'respuesta_presupuesto no existe' } });

                res.status(200).json({ error: false, data: data.toJSON() })

            })
            .catch(function(err) {
                res.status(500).json({ error: false, data: { message: err.message } })
            })

    },

    exports.updateDocument = (req, res) => {

        let conditions = { id: req.params.id };
        Respuesta_presupuesto.forge(conditions).fetch()
            .then(function(respuesta_presupuesto) {
                if (!respuesta_presupuesto) return res.status(404).json({ error: true, data: { message: 'respuesta_presupuesto no existe' } });

                let updateData = {
                    id_presupuesto: req.body.id_presupuesto,
                    id_tipo_respuesta_presupuesto: req.body.id_tipo_respuesta_presupuesto,
                    descripcion: req.body.descripcion,
                    estatus: req.body.estatus,
                    fecha_creacion: req.body.fecha_creacion,
                }

                respuesta_presupuesto.save(updateData)
                    .then(function(data) {
                        res.status(200).json({ error: false, data: { message: 'respuesta_presupuesto actualizado' } });

                    })
                    .catch(function(err) {
                        res.status(500).json({ error: false, data: { message: err.message } });
                    })

            })
            .catch(function(err) {
                res.status(500).json({ error: false, data: { message: err.message } })
            })

    },

    exports.deleteDocument = (req, res) => {
        let conditions = { id: req.params.id };
        res.status(200).json({ error: false, data: { message: 'descripcion_negocio eliminado' } })
        Respuesta_presupuesto.forge(conditions).fetch()
            .then(function(respuesta_presupuesto) {
                if (!respuesta_presupuesto) return res.status(404).json({ error: true, data: { message: 'respuesta_presupuesto no existe' } });
                respuesta_presupuesto.destroy()
                    .then(function(data) {
                        res.status(200).json({ error: false, data: { message: 'respuesta_presupuesto eliminado' } })

                    })
                    .catch(function(err) {
                        res.status(500).json({ error: true, data: { message: err.message } });
                    })

            })
            .catch(function(err) {
                res.status(500).json({ error: false, data: { message: err.message } })
            });
    }