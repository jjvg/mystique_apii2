//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const cliente_solicitudes = require('../models/cliente_solicitudes');

exports.findDocuments = (req, res) => {

    cliente_solicitudes.forge().fetchAll({ withRelated: ['solicitudes', 'solicitudes.vista_servicio_solicitado'] })
        .then(function(data) {
            res.status(200).json({ error: false, data: data.toJSON() });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}


exports.findOneDocument = (req, res) => {

    let conditions = { id: req.params.id };

    cliente_solicitudes.forge(conditions).fetch({ withRelated: ['solicitudes', 'solicitudes.vista_servicio_solicitado'] })
        .then(function(data) {
            if (!data) return res.status(404).json({ error: true, data: { message: 'cliente no existe' } });

            res.status(200).json({ error: false, data: data.toJSON() })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}