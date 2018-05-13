//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Solicitud = require('../models/solicitud');
exports.findDocuments = (req, res) => {

    Solicitud.forge().fetchAll()
        .then(function(data) {
            res.status(200).json({ error: false, data: data.toJSON() });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

exports.createDocument = (req, res) => {

    let newData = {
        id_cliente: req.body.id_cliente,
        id_promocion: req.body.id_promocion,
        fecha_creacion: req.body.fecha_creacion,
        estatus: 'A',
    }


    Solicitud.forge(newData).save()
        .then(function(data) {
                if (req.body.servicio) {
                    console.log(req.body.servicio)
                    for (var i = 0; i < req.body.servicio.length; i++) {

                        let newSelec = {
                            id_servicio: req.body.servicio[i],
                            id_solicitud: data.id,
                            estatus: 'A',
                            fecha_creacion: req.body.fecha_creacion,
                        }

                        Servicio_solicitado.forge(newSelec).save()
                            .then(function(ser) {
                                console.log('valor parametro guardado')
                            })
                            .catch(function(err) {
                                console.log(err);
                            });

                    }

                }
            }, Solicitud.forge(newData).save()
            .then(function(data) {
                res.status(200).json({ error: false, data: { message: 'solicitud creado' } });
            }).catch(function(err) {
                res.status(500).json({ error: true, data: { message: err.message } });
            })
        )
}


exports.findOneDocument = (req, res) => {

    let conditions = { id: req.params.id };
    Solicitud.forge(conditions).fetch()
        .then(function(data) {
            if (!data) return res.status(404).json({ error: true, data: { message: 'solicitud no existe' } });

            res.status(200).json({ error: false, data: data.toJSON() })
        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })
};
exports.updateDocument = (req, res) => {

    let conditions = { id: req.params.id };

    Solicitud.forge(conditions).fetch()
        .then(function(solicitud) {
            if (!solicitud) return res.status(404).json({ error: true, data: { message: 'solicitud no existe' } });
            let updateData = {
                id_cliente: req.body.id_cliente,
                id_promocion: req.body.id_promocion,
                fecha_creacion: req.body.fecha_creacion,
                estatus: req.body.estatus,
            };
            solicitud.save(updateData)
                .then(function(data) {
                    res.status(200).json({ error: false, data: { message: 'solicitud actualizado' } });
                })

            .catch(function(err) {
                res.status(500).json({ error: false, data: { message: err.message } });
            })
        })
}

exports.deleteDocument = (req, res) => {
    let conditions = { id: req.params.id };
    Solicitud.forge(conditions).fetch()
        .then(function(solicitud) {
            if (!solicitud) return res.status(404).json({ error: true, data: { message: 'solicitud no existe' } });
            solicitud.destroy()
                .then(function(data) {
                    res.status(200).json({ error: false, data: { message: 'solicitud eliminado' } })
                })
                .catch(function(err) {
                    res.status(500).json({ error: true, data: { message: err.message } });
                })

        })


}