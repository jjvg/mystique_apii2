//---- dependencias ------
const Bookshelf = require('../db');

const Titulo_seccion = Bookshelf.Model.extend({
  tableName: 'titulo_seccion',
});

module.exports = Titulo_seccion;