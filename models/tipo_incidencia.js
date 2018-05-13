//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_incidencia = Bookshelf.Model.extend({
  tableName: 'tipo_incidencia',
});

module.exports = Tipo_incidencia;