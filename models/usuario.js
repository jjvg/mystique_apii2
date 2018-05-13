//---- dependencias ------
const Bookshelf = require('../db');

const Usuario = Bookshelf.Model.extend({
  tableName: 'usuario',
});

module.exports = Usuario;