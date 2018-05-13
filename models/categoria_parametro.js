//---- dependencias ------
const Bookshelf = require('../db');

const Categoria_parametro = Bookshelf.Model.extend({
  tableName: 'categoria_parametro',
});

module.exports = Categoria_parametro;