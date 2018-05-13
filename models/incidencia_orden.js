//---- dependencias ------
const Bookshelf = require('../db');

const Incidencia_orden = Bookshelf.Model.extend({
  tableName: 'incidencia_orden',
});

module.exports = Incidencia_orden;