//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_parametro = Bookshelf.Model.extend({
  tableName: 'tipo_parametro',
});

module.exports = Tipo_parametro;