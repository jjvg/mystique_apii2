//---- dependencias ------
const Bookshelf = require('../db');

const Parametro = Bookshelf.Model.extend({
  tableName: 'parametro',
});

module.exports = Parametro;