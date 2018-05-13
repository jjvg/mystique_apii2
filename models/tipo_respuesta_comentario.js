//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_respuesta_comentario = Bookshelf.Model.extend({
  tableName: 'tipo_respuesta_comentario',
});

module.exports = Tipo_respuesta_comentario;