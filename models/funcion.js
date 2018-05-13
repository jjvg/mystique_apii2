//---- dependencias ------
const Bookshelf = require('../db');

const Funcion = Bookshelf.Model.extend({
  tableName: 'funcion',
});

module.exports = Funcion;