//---- dependencias ------
const Bookshelf = require('../db');

const Contacto_negocio = Bookshelf.Model.extend({
  tableName: 'contacto_negocio',
});

module.exports = Contacto_negocio;