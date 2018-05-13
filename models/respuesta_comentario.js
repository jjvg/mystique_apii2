//---- dependencias ------
const Bookshelf = require('../db');

const Respuesta_comentario = Bookshelf.Model.extend({
  tableName: 'respuesta_comentario',
});

module.exports = Respuesta_comentario;