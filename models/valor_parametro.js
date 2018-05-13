
//---- dependencias ------
const Bookshelf = require('../db');

const Valor_parametro = Bookshelf.Model.extend({
  tableName: 'valor_parametro',
});

module.exports = Valor_parametro;