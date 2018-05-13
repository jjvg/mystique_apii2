//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_respuesta_solicitud = Bookshelf.Model.extend({
  tableName: 'tipo_respuesta_solicitud',
});

module.exports = Tipo_respuesta_solicitud;