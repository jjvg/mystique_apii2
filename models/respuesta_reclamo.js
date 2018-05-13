//---- dependencias ------
const Bookshelf = require('../db');

const Respuesta_reclamo = Bookshelf.Model.extend({
  tableName: 'respuesta_reclamo',
});

module.exports = Respuesta_reclamo;