//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_comentario = Bookshelf.Model.extend({
  tableName: 'tipo_comentario',
});

module.exports = Tipo_comentario;