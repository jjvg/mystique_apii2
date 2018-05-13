//---- dependencias ------
const Bookshelf = require('../db');

const Razon_incidencia = Bookshelf.Model.extend({
  tableName: 'razon_incidencia',
});

module.exports = Razon_incidencia;