const Bookshelf = require('../db');

const Vista_respuesta_solicitud = Bookshelf.Model.extend({
  tableName: 'vista_respuesta_solicitud',
});

module.exports = Vista_respuesta_solicitud