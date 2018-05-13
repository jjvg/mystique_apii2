//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_respuesta_reclamo = Bookshelf.Model.extend({
  tableName: 'tipo_respuesta_reclamo',
});

module.exports = Tipo_respuesta_reclamo;