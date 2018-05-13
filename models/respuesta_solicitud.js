//---- dependencias ------
const Bookshelf = require('../db');

const Respuesta_solicitud = Bookshelf.Model.extend({
  tableName: 'respuesta_solicitud',
});

module.exports = Respuesta_solicitud;