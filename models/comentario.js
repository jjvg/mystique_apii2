//---- dependencias ------
const Bookshelf = require('../db');

const Comentario = Bookshelf.Model.extend({
  tableName: 'comentario',
});

module.exports = Comentario;