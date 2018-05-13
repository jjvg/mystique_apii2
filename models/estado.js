//---- dependencias ------
const Bookshelf = require('../db');

const Estado = Bookshelf.Model.extend({
  tableName: 'estado',
});

module.exports = Estado;