//---- dependencias ------
const Bookshelf = require('../db');

const Bloque = Bookshelf.Model.extend({
  tableName: 'bloque',
});

module.exports = Bloque;