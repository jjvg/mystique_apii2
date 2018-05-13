'use strict' //de uso estricto para el servidor
const v_comentarios = require('../models/v_comentarios');

//next para encadenar a otra funcion
function findFComentarios(req, res, next) {

    v_comentarios.forge().fetchAll()
        .then(function(data) {
            if (!data) return res.status(404).json({ error: true, data: { message: 'no hay datos...' } });
            res.status(200).json({ error: false, data: data });
        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}

function findOneComentario(req, res) {

    let conditions = { id: req.params.id };

    v_comentarios.forge(conditions).fetch()
        .then(function(data) {
            if (!data) return res.status(404).json({ error: true, data: { message: 'no hay datos...' } });

            res.status(200).json({ error: false, data: data.toJSON() })

        })
        .catch(function(err) {
            res.status(500).json({ error: false, data: { message: err.message } })
        })

}

module.exports = {
    findFComentarios,
    findOneComentario
}