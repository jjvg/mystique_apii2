//---- dependencias ------
const Bookshelf = require('../db');

const Negocio = Bookshelf.Model.extend({
  tableName: 'negocio',
});

module.exports = Negocio;