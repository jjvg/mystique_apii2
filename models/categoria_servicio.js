//---- dependencias ------
const Bookshelf = require('../db');

const Categoria_servicio = Bookshelf.Model.extend({
  tableName: 'categoria_servicio',
});

module.exports = Categoria_servicio;