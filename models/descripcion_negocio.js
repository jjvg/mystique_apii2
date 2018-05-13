//---- dependencias ------
const Bookshelf = require('../db');

const Descripcion_negocio = Bookshelf.Model.extend({
  tableName: 'descripcion_negocio',
});

module.exports = Descripcion_negocio;